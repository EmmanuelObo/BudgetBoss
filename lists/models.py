from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from categories.models import Category


class List(models.Model):
    '''
    User's Expense List containing Expense Items
    '''
    title = models.CharField(max_length=20, default='Empty',
                             null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    dateCreated = models.DateTimeField(default=datetime.now, blank=True)
    limit = models.DecimalField(decimal_places=2, max_digits=100, default=None, null=True, blank=True)

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
