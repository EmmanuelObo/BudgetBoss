from django.http import HttpResponse
from django.shortcuts import render
from .forms import NewItemForm


def central(request):
    return render(request, 'list.html', {"user": request.user})
