from django.contrib.auth import logout
from django.http import HttpResponseRedirect
from django.shortcuts import render

from lists.helpers import listfunc


def index(request):
    if request.user.is_authenticated():
        print(request.user.username)
        return HttpResponseRedirect('/home')
    else:
        return render(request, 'welcome.html')


def home(request):
    if request.user.is_authenticated:
        print("{} {}".format('CURRENT USER\'s CATEGORIES: ', list(request.user.category_set.all())))
        user = request.user
        user_lists = user.list_set
        error = None
        listfunc.list_ops(request)
        return render(request, 'home.html',
                      {'user': user, 'error': error,
                       'user_lists': user_lists})

    else:
        error = 'No User\'s Authenticated'
        return render(request, 'home.html', {'error': error})


def user_logout(request):
    logout(request)
    return HttpResponseRedirect('/login')
