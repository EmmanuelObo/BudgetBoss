from django import forms
from . import enums


class NewItemForm(forms.Form):
    item = forms.CharField(label='Item', max_length=150)
    note = forms.CharField(label='Note')
    priority = forms.ChoiceField(choices=enums.priorities)
