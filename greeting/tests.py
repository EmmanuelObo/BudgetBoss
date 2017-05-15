from django.test import TestCase
from .models import List, Category, Item
from django.contrib.auth.models import User
from operator import attrgetter

# Create your tests here.

class UserCreatedTest(TestCase):
    def testUsername(self):
        loggedInUser = User.objects.create_superuser('mannyo', 'manny@virginia.com', 'admin')
        print(loggedInUser)

        self.client.login(username='mannyo', password='admin')

        cat = Category.objects.create(title="Bills", owner=loggedInUser)

        userList = List.objects.create(title='Test List', category=cat, owner=loggedInUser, limit=100)

        self.assertEquals(userList.limit, 100, msg='INCORRECT VALUE')

        Item.objects.create(name='Vanilla Ice Cream', cost=10, priority='LOW', list=userList)
        Item.objects.create(name='Cheesecake Deluxe', cost=2, priority='HIGH', list=userList)
        Item.objects.create(name='Red Velvet Deluxe', cost=5, priority='MEDIUM', list=userList)
        Item.objects.create(name='Jello', cost=5, priority='LOW', list=userList)
        Item.objects.create(name='Bread', cost=5, priority='HIGH', list=userList)
        Item.objects.create(name='Marshmellows', cost=5, priority='LOW', list=userList)

        session = self.client.session

        print(Item.objects.__doc__)

        session['pass'] = loggedInUser.password
        session.save()

        for item in Item.objects.prioritize():
            print(item)