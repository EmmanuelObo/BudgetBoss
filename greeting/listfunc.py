from .models import List


def create_list(request):
    if request.is_ajax():
        listtitle = request.POST.get('newListTitle')
        List.objects.create(title=listtitle, total=0, owner=request.user)
