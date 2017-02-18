from django import forms
from . import enums 


class ExpenseListForm(forms.Form):
	item = forms.CharField(label='Item', max_length=150)
	note = forms.CharField(label='Note')
	priority = forms.ChoiceField(choices=enums.priorities)

class LoginForm(forms.Form):
	username = forms.CharField(required = True, max_length=30)
	password = forms.CharField(required = True, max_length=30)

class RegisterForm(forms.Form):
	username = forms.CharField(required = True, max_length=30)
	first_name = forms.CharField(max_length=45)
	last_name = forms.CharField(max_length=45)
	password = forms.CharField(required = True, max_length=30)
	password_conf = forms.CharField(label='Confirm Password', required = True, max_length=30)
	email = forms.EmailField(required = True, max_length=40)