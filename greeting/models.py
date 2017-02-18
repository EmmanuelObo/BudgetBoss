from django.db import models
from django.contrib.auth.models import User

class List(models.Model):
    title = models.CharField(max_length=20)
    total = models.IntegerField()
    count = models.IntegerField(default=1)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Item(models.Model):
    name = models.CharField(max_length=50)
    note = models.CharField(max_length=256)
    cost = models.DecimalField(decimal_places=2, max_digits=1000000)
    priority = models.CharField(max_length=10)
    dateCreated = models.DateField()
    list = models.ForeignKey(List, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
