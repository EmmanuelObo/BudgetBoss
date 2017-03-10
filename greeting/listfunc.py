from .models import List


# noinspection SpellCheckingInspection
def create_list(request):
    if request.is_ajax():
        listtitle = request.POST.get('newListTitle')
        if listtitle is None or listtitle == "":
            return
        else:
            List.objects.create(title=listtitle, total=0, owner=request.user)


def delete_list(request):
    if request.is_ajax():
        listID = request.POST.get('listId')
        if listID is None or listID == "":
            return
        else:
            listID = int(listID)
            List.objects.get(pk=listID).delete()


def edit_list(request):
    if request.is_ajax():
        listID = request.POST.get('listId')
        if listID is None or listID == "":
            return
        else:
            listID = int(listID)
            user_list = List.objects.get(pk=listID)
            return user_list
