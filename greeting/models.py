from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from . import enums
from operator import attrgetter


class Category(models.Model):
    '''
    User's Expense List Categories
    '''
    title = models.CharField(max_length=30)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    @property
    def total(self):
        total = 0
        lists = self.list_set.all()
        for catList in lists:
            total += catList.total
        return total

    @property
    def count(self):
        return len(self.list_set.all())

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Categories'


class List(models.Model):
    '''
    User's Expense List containing Expense Items
    '''
    title = models.CharField(max_length=20, default='Empty',
                             null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    dateCreated = models.DateTimeField(default=datetime.now, blank=True)
    limit = models.DecimalField(decimal_places=2, max_digits=10000000, default=None, null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.title == "" or self.title is None:
            return
        else:
            super(List, self).save(*args, **kwargs)

    @property
    def count(self):
        return len(self.item_set.all())

    @property
    def total(self):
        total = 0
        items = self.item_set.all()
        for item in items:
            total += item.cost
        return total

    def hasExceededLimit(self):
        if self.total > self.limit:
            return True

        elif self.total < self.limit:
            return False

    def __str__(self):
        return self.title

class ItemManager(models.Manager):
    '''
    Item's Manager Model
    Use(s):
    1. Sort all items based on their priority
    '''
    def prioritize(self):
        prio = self.all()
        prioritized = sorted(prio, key=attrgetter('item_value'), reverse = True)
        return prioritized

class Item(models.Model):
    '''
    User's Expense Item
    '''
    name = models.CharField(max_length=50)
    note = models.TextField(null=True, blank=True)
    cost = models.DecimalField(decimal_places=2, max_digits=1000000)
    priority = models.CharField(max_length=10, choices=enums.priorities, default='MEDIUM')
    dateCreated = models.DateTimeField(default=datetime.now, blank=True)
    list = models.ForeignKey(List, on_delete=models.CASCADE)
    objects = ItemManager()

    @property
    def item_value(self):
        if self.priority == 'HIGH':
            return 2
        elif self.priority == 'MEDIUM':
            return 1
        elif self.priority == 'LOW':
            return 0

    def __str__(self):
        return self.name
