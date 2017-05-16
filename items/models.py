from datetime import datetime
from operator import attrgetter

from django.db import models
from app import enums
from lists.models import List


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

    cost = models.DecimalField(decimal_places=2, max_digits=999)
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
