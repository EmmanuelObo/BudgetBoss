from django.db import models
from django.contrib.auth.models import User


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