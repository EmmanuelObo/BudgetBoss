from django.contrib import admin

from lists.models import List
from items.models import Item
from categories.models import Category

# Register your models here.

admin.site.register(List)
admin.site.register(Item)
admin.site.register(Category)
