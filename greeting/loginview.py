from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect


def user_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        return HttpResponseRedirect('/home')

    else:
        return render(request, 'login.html', {'response': 'Login unsuccessful'})

    return render(request, 'login.html', {'form': form})
