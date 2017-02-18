from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render
from .forms import RegisterForm


def register(request):
	form = RegisterForm(request.POST)


	if form.is_valid():

		new_user = User.objects.create_user(username = form.cleaned_data['username'], 
			 first_name=form.cleaned_data['first_name'],
			last_name=form.cleaned_data['last_name'])

		new_user.password = form.cleaned_data['password']
		new_user.email = form.cleaned_data['email']

		new_user.save()

		form = RegisterForm()

	return render(request, 'register.html', {'form': form})
