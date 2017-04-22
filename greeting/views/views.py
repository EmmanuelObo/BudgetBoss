from django.contrib.auth import logout
from django.http import HttpResponseRedirect
from django.shortcuts import render
from greeting import listfunc
import logging

logger = logging.getLogger(__name__)


def index(request):
    if request.user.is_authenticated():
        logger.info("HEY!")
        print(request.user.username)
        return HttpResponseRedirect('/home')
    else:
        return render(request, 'welcome.html')


def home(request):
    if request.user.is_authenticated:
        print("{} {}".format('CURRENT USER\'s CATEGORIES: ', list(request.user.category_set.all())))
        logger.info("User, " + request.user.username + " has successfully logged in.")
        user = request.user
        user_lists = user.list_set
        error = None
        listfunc.list_ops(request)
        return render(request, 'home.html',
                      {'user': user, 'error': error,
                       'user_lists': user_lists})

    else:
        logger.error("User is not authenticated.")
        error = 'No User\'s Authenticated'
        return render(request, 'home.html', {'error': error})


def user_logout(request):
    logout(request)
    logger.info("User successfully logged out.")
    return HttpResponseRedirect('/login')