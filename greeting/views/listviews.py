from greeting import listfunc
from django.shortcuts import render


def central(request):
    listfunc.create_list(request)
    listfunc.delete_list(request)
    return render(request, 'list.html', {"user": request.user})


def listtemplate(request):
    return render(request, 'subtemplates/list_sub.html', {"user": request.user})


def editlist(request):
    return render(request, 'editlist.html', {"user": request.user})


def editlisttemplate(request):
    user_list = listfunc.edit_list(request)
    return render(request, 'subtemplates/editlist_sub.html', {"user": request.user, "list":user_list})
