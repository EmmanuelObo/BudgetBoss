import datetime

from django.http import HttpResponse
from django.shortcuts import render

from items.helpers import itemfunc
from lists.helpers import listfunc
from lists.models import List
from categories.models import Category


def sortByCategory(request):
    if request.is_ajax():
        if request.POST.get('selectedCategory') is not None:
            currCat = request.POST.get('selectedCategory')
            request.session['selectedCategory'] = currCat


def central(request):
    print('----(CENTRAL) LIST VIEW----')
    listfunc.list_ops(request)
    user_lists = request.user.list_set.order_by('-dateCreated')
    sortByCategory(request)
    print(user_lists)
    return render(request, 'list.html', {"user": request.user, "user_list": user_lists})


def listtemplate(request):
    print('----(SUB TEMPLATE) LIST VIEW----')
    selectedCategory = request.session['selectedCategory']
    if selectedCategory == 'All':
        filteredList = request.user.list_set.order_by('-dateCreated')
        allCat = Category.objects.get(title=selectedCategory)
        return render(request, 'subtemplates/list_sub.html', {"user": request.user, "user_list": filteredList,
                                                              "category": allCat })

    filteredList = List.objects.filter(category=Category.objects.get(title=request.session['selectedCategory']),
                                       owner=request.user)

    filteredList = filteredList.order_by('-dateCreated')
    print(filteredList)
    return render(request, 'subtemplates/list_sub.html', {"user": request.user, "user_list": filteredList,
                                                          "category": Category.objects.get(title=selectedCategory)})


def editlist(request, id):
    user_list = List.objects.get(pk=id)
    itemfunc.item_ops(request)
    return render(request, 'editlist.html',
                  {"user": request.user, 'list': user_list, 'time_now': datetime.datetime.now})


def editlisttemplate(request):
    currentListID = request.session['currentListId']
    user_list = List.objects.get(pk=currentListID)
    itemfunc.item_ops(request)
    return render(request, 'subtemplates/editlist_sub.html',
                  {"user": request.user, 'list': user_list, 'time_now': datetime.datetime.now})

def currlist(request, id):
    mylist = List.objects.get(pk=id)
    if mylist == None:
        return HttpResponse("List Not Found!")
    return HttpResponse("List Title: " + mylist.title + ", \n ID: " + str(mylist.id))