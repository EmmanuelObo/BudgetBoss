from . import listfunc
from django.shortcuts import render


def central(request):
    listfunc.create_list(request)
    return render(request, 'list.html', {"user": request.user})
