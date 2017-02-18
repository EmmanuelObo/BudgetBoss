from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render


def register(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    email = request.POST.get('email')
    response = ''

    if username is not None and password is not None:
        user = User.objects.create_user(username=username, email=email,
                                        password=password)
        if user is not None:
            response = user.username + ' successfully registered!'

        else:
            response = 'User registeration unsuccessful'

    return render(request, 'register.html', {'response': response})
