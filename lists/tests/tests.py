from django.test import TestCase
from django.contrib.auth.models import User
from lists.models import List
from categories.models import Category

# Create your tests here.

class FileCreationTest(TestCase):
    def testCreateFile(self):
        user = User.objects.create_superuser(username='manny',email='eobogbai@buffalo.edu',password='pass1234')
        Category.objects.create(title='Bills', owner=user)
        Category.objects.create(title='Food', owner=user)
        Category.objects.create(title='Loans', owner=user)
        Category.objects.create(title='Home', owner=user)

        myList = List.objects.create(title='Test List', category=Category.objects.get(title='Bills'),owner=user)

        file = open(myList.title,'w')

        self.assertIsNone(file,msg="This File is None")

        print(myList.title)