from lists.models import List
from categories.models import Category
import logging

logger = logging.getLogger(__name__)


def list_ops(request):
    if request.is_ajax():
        if request.POST.get('newListTitle') is not None and request.POST.get('newListCat') is not None:
            print("Creating new List w/ Category...")
            listTitle = request.POST.get('newListTitle')
            catTitle = request.POST.get('newListCat')
            listCategory = Category.objects.get(title=catTitle)

            print(request.POST.get('newListLimit'))
            if request.POST.get('newListLimit') != 'NO LIMIT' and request.POST.get('newListLimit') is not None:
                try:
                    listLimit = request.POST.get('newListLimit')
                    List.objects.create(title=listTitle, owner=request.user, category=listCategory,
                                        limit=listLimit)
                except TypeError as err:
                    print("ERROR has occurred")
                    print(err)
            else:
                try:
                    List.objects.create(title=listTitle, total=0, owner=request.user, category=listCategory)

                except TypeError as err:
                    print("ERROR has occurred")
                    print(err)

            print("CATEGORY SELECTED: " + catTitle)
            print(List.objects.get(title=listTitle))

        elif request.POST.get('listId') is not None:
            listID = int(request.POST.get('listId'))
            List.objects.get(pk=listID).delete()

        elif request.POST.get('editListId'):
            listID = int(request.POST.get('editListId'))
            request.session['currentListId'] = listID
