from django.contrib.auth import logout
from django.http import HttpResponseRedirect
from django.shortcuts import render


def index(request):

        return render(request, 'welcome.html')


def home(request):
    if request.user.is_authenticated:
        user = request.user
        user_lists = user.list_set
        error = None
        return render(request, 'home.html',
                      {'user': user, 'error': error,
                       'user_lists': user_lists})

    else:
        error = 'No User\'s Authenticated'
        return render(request, 'home.html', {'error': error})


def user_logout(request):
    logout(request)
    return HttpResponseRedirect('/login')
