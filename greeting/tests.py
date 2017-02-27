from django.test import TestCase
from .models import User


# Create your tests here.

class UserCreatedTest(TestCase):
    def testUsername(self):
        testUser = User(username='MannyO', password='pass', email='emma@gmail.com')

        self.assertEqual(testUser.username, 'MannyO')
