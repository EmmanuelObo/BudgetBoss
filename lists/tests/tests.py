from django.test import TestCase
from django.contrib.auth.models import User
from lists.models import List
from categories.models import Category
from items.models import Item

# Create your tests here.

class FileCreationTest(TestCase):

    def setUp(self):
        user = User.objects.create_superuser(username='manny',email='eobogbai@buffalo.edu',password='pass1234')

        Category.objects.create(title='Bills', owner=user)
        Category.objects.create(title='Food', owner=user)
        Category.objects.create(title='Loans', owner=user)
        Category.objects.create(title='Home', owner=user)

        List.objects.create(title='Test List', category=Category.objects.get(title='Bills'), owner=user)

        Item.objects.create(name='Third Item', cost=3.99, list=List.objects.get(title='Test List'), priority='MEDIUM')
        Item.objects.create(name='Fourth Item', cost=4.99, list=List.objects.get(title='Test List'), priority='LOW')
        Item.objects.create(name='First Item', cost=1.99, list=List.objects.get(title='Test List'), priority='HIGH')
        Item.objects.create(name='Second Item', cost=2.99, list=List.objects.get(title='Test List'), priority='MEDIUM')



    def testCreateFile(self):
        myList = List.objects.get(title='Test List')

        file = open(myList.title + '.txt','w')

        self.assertIsNotNone(file,msg="This File is None")

        for item in Item.objects.prioritize():
            file.write(item.name + ' -- ' + '$' + str(item.cost) + ' -- ' + item.priority + '\n')

        print(myList.title)