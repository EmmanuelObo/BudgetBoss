from greeting import listfunc, itemfunc
from django.shortcuts import render
from ..models import List, Category
import datetime


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
        return render(request, 'subtemplates/list_sub.html', {"user": request.user, "user_list": filteredList,
                                                              "category": Category.objects.get(title=selectedCategory)})

    filteredList = List.objects.filter(category=Category.objects.get(title=request.session['selectedCategory']),
                                       owner=request.user)
    print(filteredList)
    return render(request, 'subtemplates/list_sub.html', {"user": request.user, "user_list": filteredList,
                                                          "category": Category.objects.get(title=selectedCategory)})


def editlist(request):
    currentListID = request.session['currentListId']
    user_list = List.objects.get(pk=currentListID)
    itemfunc.item_ops(request)
    return render(request, 'editlist.html',
                  {"user": request.user, 'list': user_list, 'time_now': datetime.datetime.now})


def editlisttemplate(request):
    currentListID = request.session['currentListId']
    user_list = List.objects.get(pk=currentListID)
    itemfunc.item_ops(request)
    return render(request, 'subtemplates/editlist_sub.html',
                  {"user": request.user, 'list': user_list, 'time_now': datetime.datetime.now})
