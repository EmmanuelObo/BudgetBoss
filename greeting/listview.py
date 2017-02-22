from django.http import HttpResponse
from django.shortcuts import render
from .forms import NewItemForm

notelist = []


def home(request):
    form = NewItemForm(request.POST)

    if form.is_valid():
        notelist.append(form.cleaned_data['item'])
        form = NewItemForm()

    return render(request, "list.html", {'form': form, 'notes': notelist})
