from django.test import TestCase
from .models import List, Category, Item
from django.contrib.auth.models import User


# Create your tests here.

class UserCreatedTest(TestCase):
    def testUsername(self):
        loggedInUser = User.objects.create_superuser('mannyo', 'manny@virginia.com', 'admin')
        print(loggedInUser)

        self.client.login(username='mannyo', password='admin')

        cat = Category.objects.create(title="Bills", owner=loggedInUser)

        userList = List.objects.create(title='Test List', category=cat, owner=loggedInUser, limit=100)

        self.assertEquals(userList.limit, 100, msg='INCORRECT VALUE')


        Item.objects.create(name='Vanilla Ice Cream', cost=6.99, priority='LOW', list=userList)
        Item.objects.create(name='Cheesecake Deluxe', cost=59.99, priority='HIGH', list=userList)
        Item.objects.create(name='Red Velvet Deluxe', cost=69.99, priority='MEDIUM', list=userList)


        self.assertTrue(userList.hasExceededLimit())
        session = self.client.session

        self.assertEquals(len(userList.item_set.all()), 3, msg='WRONG AMOUNT')

        session['pass'] = loggedInUser.password
        session.save()

        for item in userList.item_set.all():
            print("--> " +item.name)
