from django.http import HttpResponse
from django.shortcuts import render
from .forms import ExpenseListForm

notelist = []


def home(request):
    form = ExpenseListForm(request.POST)

    if form.is_valid():
        notelist.append(form.cleaned_data['item'])
        form = ExpenseListForm()

    return render(request, "list.html", {'form': form, 'notes': notelist})
