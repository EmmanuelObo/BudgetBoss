from django.shortcuts import render


def hometemplate(request):
    return render(request, 'subtemplates/home_sub.html', {'user': request.user})
