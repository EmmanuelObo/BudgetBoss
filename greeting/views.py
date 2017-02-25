from django.shortcuts import render
from django.contrib.auth import logout
from django.http import HttpResponseRedirect


def index(request):
    return render(request, 'welcome.html', {})


def home(request):
    if request.user.is_authenticated:
        user = request.user
        return render(request, 'home.html', {'user': user})

    else:
        return render(request, 'home.html', {'error': 'No User\'s Authenticated'})


def user_logout(request):
    logout(request)
    return HttpResponseRedirect('/login')
