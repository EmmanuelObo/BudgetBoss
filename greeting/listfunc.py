from .models import List


def list_ops(request):
    if request.is_ajax():
        if request.POST.get('newListTitle') is not None:
            title = request.POST.get('newListTitle')
            List.objects.create(title=title, total=0, owner=request.user)

        elif request.POST.get('listId') is not None:
            listID = int(request.POST.get('listId'))
            List.objects.get(pk=listID).delete()

        elif request.POST.get('editListId'):
            listID = int(request.POST.get('editListId'))
            request.session['currentListId'] = listID
