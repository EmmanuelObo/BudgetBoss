from django.contrib.auth.models import User
from tastypie import fields
from tastypie.authentication import BasicAuthentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from lists.models import List
from items.models import Item
from categories.models import Category


class UserResource(ModelResource):
    category = fields.ToManyField('app.api.resources.CategoryResource', 'category_set', related_name='category')

    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        excludes = ['email', 'password', 'is_active', 'is_staff', 'is_superuser']
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'post']
        filtering = {
            'username': ALL,
        }
        authentication = BasicAuthentication()

    def alter_list_data_to_serialize(self, request, data):
        if request.GET.get('object_only'):
            return {'objects': data['objects']}

        return data

class CategoryResource(ModelResource):
    user = fields.ToOneField(UserResource, 'owner')
    lists = fields.ToManyField('app.api.resources.ListResource','list_set', related_name='list')

    class Meta:
        queryset = Category.objects.all()
        authorization = Authorization()
        resource_name = 'category'
        filtering = {
            'user': ALL_WITH_RELATIONS,
        }

class ListResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'owner')
    category = fields.ToOneField(CategoryResource, 'category')
    item = fields.ToManyField('app.api.resources.ItemResource', 'item_set', related_name='item')

    class Meta:
        queryset = List.objects.all()
        authorization = Authorization()
        resource_name = 'list'
        filtering = {
            'owner': ALL_WITH_RELATIONS,
            'category': ALL_WITH_RELATIONS,
        }

class ItemResource(ModelResource):
    list = fields.ToOneField(ListResource, 'list')

    class Meta:
        queryset = Item.objects.all()
        authorization = Authorization()
        resource_name = 'item'
        filtering = {
            'list': ALL_WITH_RELATIONS,
        }

