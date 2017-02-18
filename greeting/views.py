from django.shortcuts import render
from django.http import HttpResponse


def index(request):
	text = "Hello World this is Emmanuel's first Django App!"
	html = "<html><body style='text-align: center;'><h1>"+ text +"</h1></body></html>"
	note = 'hello world'

	return HttpResponse('Hello World - Emmanuel Obogbaimhe')

def home(request):
	return HttpResponse("Homepage")