from django.contrib.auth.models import User
from django.db import models
from datetime import datetime

# Create your models here.


class Goal(models.Model):
    '''
    Goals:
    User's financial savings goals. User selects a start date (defaults to date created), an end date as well as the amount he/she wishes to save by the end date.

    '''
    name = models.CharField(max_length=30)
    value = models.IntegerField()
    desc = models.TextField(null=True, blank=True)
    start_date = models.DateField(default=datetime.now)
    end_date = models.DateField(null=True)
    days_left = models.IntegerField(null=True)
    is_active = models.BooleanField()
    is_recurring = models.BooleanField()
    is_accomplished = models.BooleanField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)


    @property
    def progress(self):
        daily_savings = (self.value/self.days_left)
        return 'On Track: {} needs to save ${} a day, for the next {} days to accomplish their goal. You can do it!'.format(self.owner.username, daily_savings, self.days_left)

    def __str__(self):
        print(str(self.name))