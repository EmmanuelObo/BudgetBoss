from django.shortcuts import render


def userhomecontent(request):
    return render(request, 'homecontent.html', {'user': request.user})
