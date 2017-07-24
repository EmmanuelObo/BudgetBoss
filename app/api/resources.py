from django.contrib.auth.models import User
from tastypie import fields
from tastypie.authentication import BasicAuthentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from lists.models import List
from items.models import Item
from categories.models import Category


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        excludes = [ 'email', 'password', 'is_active', 'is_staff', 'is_superuser']
        filtering = {
            'username': ALL,
        }
        authentication = BasicAuthentication()

class CategoryResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user')

    class Meta:
        queryset = Category.objects.all()
        authorization = Authorization()
        resource_name = 'category'
        filtering = {
            'user': ALL_WITH_RELATIONS,
        }

class ListResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'owner')
    category = fields.ForeignKey(CategoryResource, 'category')

    class Meta:
        queryset = List.objects.all()
        authorization = Authorization()
        resource_name = 'list'
        filtering = {
            'owner': ALL_WITH_RELATIONS,
            'category': ALL_WITH_RELATIONS,
        }

class ItemResource(ModelResource):
    list = fields.ForeignKey(ListResource, 'list')

    class Meta:
        queryset = Item.objects.all()
        authorization = Authorization()
        resource_name = 'item'
        filtering = {
            'list': ALL_WITH_RELATIONS,
        }

