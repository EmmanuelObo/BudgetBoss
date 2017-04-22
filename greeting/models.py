from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from . import enums


class Category(models.Model):
    """
    User's Expense List Categories
    """
    title = models.CharField(max_length=30)
    total = models.IntegerField(default=0)
    count = models.IntegerField(default=0)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Categories'


class List(models.Model):
    """
    User's Expense List containing Expense Items
    """
    title = models.CharField(max_length=20, default='Empty',
                             null=True, blank=True)
    total = models.IntegerField()
    count = models.IntegerField(default=0)
    # category = models.ForeignKey(Category, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    dateCreated = models.DateTimeField(default=datetime.now, blank=True)

    # limit = models.IntegerField(default=None, null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.title == "" or self.title is None:
            return
        else:
            super(List, self).save(*args, **kwargs)

    def calculate(self):
        items = self.item_set.all()
        for item in items:
            self.total += item.cost
            self.count += 1

    def __str__(self):
        return self.title


class Item(models.Model):
    """
    User's Expense Item
    """
    name = models.CharField(max_length=50)
    note = models.TextField(null=True, blank=True)
    cost = models.DecimalField(decimal_places=2, max_digits=1000000)
    priority = models.CharField(max_length=10, choices=enums.priorities)
    dateCreated = models.DateTimeField(default=datetime.now, blank=True)
    list = models.ForeignKey(List, on_delete=models.CASCADE)

    def __str__(self):
        return self.name