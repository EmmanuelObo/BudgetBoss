from django.contrib.auth.models import User
from datetime import datetime
from tastypie import fields
from tastypie.authentication import BasicAuthentication
from tastypie.authorization import Authorization, DjangoAuthorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from lists.models import List
from items.models import Item
from categories.models import Category


class UserResource(ModelResource):
    categories = fields.ToManyField('app.api.resources.CategoryResource', 'category_set', related_name='category',
                                  null=True, blank=True)
    lists = fields.ToManyField('app.api.resources.ListResource', 'list_set', related_name='list')

    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        excludes = ['email', 'password', 'is_active', 'is_staff', 'is_superuser']
        # list_allowed_methods = ['get', 'post']
        # detail_allowed_methods = ['get', 'post']
        filtering = {
            'username': ALL,
        }
        authentication = BasicAuthentication()

    def dehydrate_category(self, bundle):
        category_id = [ int(category.split('/')[4]) for category in bundle.data['categories']] #int(bundle.data['category'].split('/')[4])
        bundle.data['categories'] = category_id
        return bundle.data['categories']

    def alter_list_data_to_serialize(self, request, data):
        if request.GET.get('object_only'):
            return {'objects': data['objects']}

        return data


class CategoryResource(ModelResource):
    user = fields.ToOneField(UserResource, 'owner', null=True, blank=True)
    lists = fields.ToManyField('app.api.resources.ListResource', 'list_set', related_name='list', null=True)

    class Meta:
        queryset = Category.objects.all()
        authorization = Authorization()
        resource_name = 'category'
        filtering = {
            'user': ALL_WITH_RELATIONS,
        }


class ListResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'owner', null=True, blank=True)
    category = fields.ToOneField(CategoryResource, 'category', null=True)
    items = fields.ToManyField('app.api.resources.ItemResource', 'item_set', related_name='item')

    class Meta:
        queryset = List.objects.all()
        authorization = Authorization()
        resource_name = 'list'
        filtering = {
            'owner': ALL_WITH_RELATIONS,
            'category': ALL_WITH_RELATIONS,
        }

    def dehydrate(self, bundle):
        count = len(bundle.obj.item_set.all())
        total = 0
        list_count = 0
        category_total = 0
        limit = None

        if bundle.obj.category.total is not None or bundle.obj.category.total != 0:
            category_total = float(bundle.obj.category.total)

        if bundle.obj.category.count is not None or bundle.obj.category.count != 0:
            list_count = int(bundle.obj.category.count)

        if bundle.obj.total is not None or bundle.obj.total != 0:
            total = float(bundle.obj.total)

        if bundle.obj.limit is not None:
            limit = float(bundle.obj.limit)

        bundle.data['dateCreated'] = str(bundle.data['dateCreated']).replace('T', ' ') \
                                                                    .replace(str(bundle.data['dateCreated'])[19:], '')
        bundle.data['items'] = [x.id for x in bundle.obj.item_set.all()]
        bundle.data['limit'] = limit
        bundle.data['category'] = {'id': bundle.obj.category.id,
                                   'title': bundle.obj.category.title,
                                   'owner': {'id': bundle.obj.category.owner.id,
                                             'username': bundle.obj.category.owner.username},
                                   'total': category_total,
                                   'list_count': list_count}
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
