from django.contrib.auth.models import User
from datetime import datetime
from tastypie import fields
from tastypie.authentication import BasicAuthentication, Authentication
from tastypie.authorization import Authorization, DjangoAuthorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS

from app.api.exceptions import CustomBadRequest
from lists.models import List
from items.models import Item
from categories.models import Category

from django.contrib.auth.hashers import make_password


class UserResource(ModelResource):
    categories = fields.ToManyField('app.api.resources.CategoryResource', 'category_set', related_name='category',
                                    null=True, blank=True)
    lists = fields.ToManyField('app.api.resources.ListResource', 'list_set', related_name='list')

    class Meta:
        allowed_methods = ['get', 'patch', 'put', 'post']
        queryset = User.objects.all()
        resource_name = 'user'
        excludes = ['email', 'password', 'is_active', 'is_staff', 'is_superuser']
        filtering = {
            'username': ALL_WITH_RELATIONS,
            'id': ALL_WITH_RELATIONS
        }
        authentication = BasicAuthentication()
        authorization = Authorization()
        always_return = True

        def hydrate(self, bundle):
            return bundle

    def dehydrate(self, bundle):
        bundle.data['categories'] = [{'id': category.id,
                                      'title': category.title,
                                      'total': float(category.total),
                                      'list_count': int(category.count),
                                      'user': bundle.obj.username} for category in bundle.obj.category_set.all()]

        bundle.data['lists'] = [{'id': userlist.id,
                                 'title': userlist.title,
                                 'limit': float(userlist.limit) if userlist.limit is not None else None,
                                 'date_created': userlist.dateCreated,
                                 'total': float(userlist.total) if userlist.total is not None else 0,
                                 'item_count': int(userlist.count) if userlist.count is not None else 0,
                                 'items': [{'id': item.id,
                                            'name': item.name,
                                            'cost': float(item.cost) if item.cost is not None else 0,
                                            'priority': item.priority} for item in userlist.item_set.all()],
                                 'category': {'id': userlist.category.id,
                                              'title': userlist.category.title,
                                              'total': float(
                                                  userlist.category.total) if userlist.category.total is not None else 0,
                                              'list_count': userlist.category.count,
                                              'user': bundle.obj.username}} for userlist in bundle.obj.list_set.all()]

        return bundle

    def alter_list_data_to_serialize(self, request, data):
        if request.GET.get('object_only'):
            return {'objects': data['objects']}

        return data


class CreateUserResource(ModelResource):
    class Meta:
        allowed_methods = ['post','get']
        always_return_data = True
        authentication = Authentication()
        authorization = Authorization()
        queryset = User.objects.all()
        resource_name = 'create_user'

        def hydrate(self, bundle):
            bundle.data['username'] = bundle.data['username'].upper()
            if bundle.data.has_key('password'):
                u = User(username='mat')
                u.set_password(make_password(bundle.data['password']))
                bundle.data['password'] = u.password
            return bundle

        def obj_create(self, bundle, **kwargs):
            kwargs["password"] = make_password(bundle.data['password'])
            bundle.data['username'] = bundle.data['username'].upper()
            bundle.data['last_name'] = 'Barney'

            #self._meta.resource_name = UserResource._meta.resource_name
            return super(CreateUserResource, self).obj_create(bundle,**kwargs)


class CategoryResource(ModelResource):
    user = fields.ToOneField(UserResource, 'owner', null=True, blank=True)
    lists = fields.ToManyField('app.api.resources.ListResource', 'list_set', related_name='list', null=True)

    class Meta:
        queryset = Category.objects.all()
        authorization = Authorization()
        resource_name = 'category'
        filtering = {
            'user': ALL_WITH_RELATIONS,
            'lists': ALL_WITH_RELATIONS
        }

    def dehydrate(self, bundle):
        bundle.data['list_count'] = int(bundle.obj.count)
        #bundle.data['total'] = float(bundle.obj.total) if bundle.obj.total is not None else 0
        bundle.data['lists'] = [{'id': currlist.id, 'title': currlist.title} for currlist in bundle.obj.list_set.all()]
        bundle.data['user'] = {'id': bundle.obj.owner.id,
                               'username': bundle.obj.owner.username}
        return bundle


class ListResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'owner', null=True, blank=True)
    category = fields.ToOneField(CategoryResource, 'category', null=True, full=True)
    items = fields.ToManyField('app.api.resources.ItemResource', 'item_set', related_name='item')

    class Meta:
        queryset = List.objects.all()
        authorization = Authorization()
        resource_name = 'list'
        filtering = {
            'user': ALL_WITH_RELATIONS,
            'category': ALL_WITH_RELATIONS,
        }

    def dehydrate(self, bundle):
        count = len(bundle.obj.item_set.all())
        total = 0
        list_count = 0
        category_total = 0
        limit = None

        # TODO: Restore 'total' & 'count' field on category
        # if bundle.obj.category.total is not None or bundle.obj.category.total != 0:
        #     category_total = float(bundle.obj.category.total)

        # if bundle.obj.category.count is not None or bundle.obj.category.count != 0:
        #     list_count = int(bundle.obj.category.count)

        if bundle.obj.total is not None or bundle.obj.total != 0:
            total = float(bundle.obj.total)

        if bundle.obj.limit is not None:
            limit = float(bundle.obj.limit)

        bundle.data['dateCreated'] = str(bundle.data['dateCreated']).replace('T', ' ') \
            .replace(str(bundle.data['dateCreated'])[19:], '')
        bundle.data['items'] = [{'id': item.id,
                                 'name': item.name,
                                 'note': item.note,
                                 'cost': float(item.cost) if item.cost is not None else 0,
                                 'priority': item.priority,
                                 'list': item.list.id} for item in bundle.obj.item_set.all()]
        bundle.data['limit'] = limit
        # bundle.data['category'] = {'id': bundle.obj.category.id,
        #                            'title': bundle.obj.category.title,
        #                            'owner': {'id': bundle.obj.category.owner.id,
        #                                      'username': bundle.obj.category.owner.username},
        #                            'total': category_total,
        #                            'list_count': list_count}
        bundle.data['item_count'] = count
        bundle.data['total'] = total
        return bundle


class ItemResource(ModelResource):
    list = fields.ToOneField(ListResource, 'list', null=True)

    class Meta:
        queryset = Item.objects.all()
        authorization = Authorization()
        resource_name = 'item'
        filtering = {
            'list': ALL_WITH_RELATIONS,
        }

    def dehydrate(self, bundle):
        bundle.data['cost'] = float(bundle.obj.cost)
        bundle.data['list'] = int(bundle.obj.list.id)

        return bundle
