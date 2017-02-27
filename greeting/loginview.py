from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect


def user_login(request):
    response = None
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        return HttpResponseRedirect('/home')

    else:
        response = 'Login Unsuccessful'
        return render(request, 'login.html', {'response': response})

    return render(request, 'login.html', {'form': form, 'response': response})
