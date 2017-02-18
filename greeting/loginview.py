from django.shortcuts import render
from django.contrib.auth import authenticate, login


def login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        return render(request, 'login.html', {'response': 'Login successful'})

    else:
        return render(request, 'login.html', {'response': 'Login unsuccessful'})

    return render(request, 'login.html', {'form': form})
