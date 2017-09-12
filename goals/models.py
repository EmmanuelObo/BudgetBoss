from django.contrib.auth.models import User
from django.db import models

# Create your models here.


class Goal(models.Model):
    '''
    Goals:
    User's financial savings goals. User selects a start date (defaults to date created), an end date as well as the amount he/she wishes to save by the end date.

    '''
    name = models.CharField(max_length=30)
    value = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    days_left = models.IntegerField()
    is_active = models.BooleanField()
    is_recurring = models.BooleanField()
    is_accomplished = models.BooleanField()
    owner = owner = models.ForeignKey(User, on_delete=models.CASCADE)


    @property
    def progress(self):
        daily_savings = (self.value/self.days_left)
        return 'On Track: {} needs to save {} a day, for the next {} to accomplish their goal. You can do it!'.format(self.owner.username, daily_savings, self.days_left)