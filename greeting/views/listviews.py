from greeting import listfunc, itemfunc
from django.shortcuts import render
from ..models import List
import datetime


def central(request):
    listfunc.list_ops(request)
    user_lists = request.user.list_set.order_by('-dateCreated')
    return render(request, 'list.html', {"user": request.user, "user_list": user_lists})


def listtemplate(request):
    user_lists = request.user.list_set.order_by('-dateCreated')
    return render(request, 'subtemplates/list_sub.html', {"user": request.user, "user_list": user_lists})


def editlist(request):
    currentListID = request.session['currentListId']
    user_list = List.objects.get(pk=currentListID)
    itemfunc.item_ops(request)
    return render(request, 'editlist.html', {"user": request.user, 'list': user_list, 'time_now': datetime.datetime.now})


def editlisttemplate(request):
    currentListID = request.session['currentListId']
    user_list = List.objects.get(pk=currentListID)
    itemfunc.item_ops(request)
    return render(request, 'subtemplates/editlist_sub.html', {"user": request.user, 'list': user_list, 'time_now': datetime.datetime.now})
