from .models import List, Item


def item_ops(request):
    if request.is_ajax():
        if request.POST.get('newItemName') is not None:
            itemName = request.POST.get('newItemName')
            itemCost = request.POST.get('newItemCost')
            itemPriority = request.POST.get('newItemPriority')
            listID = request.POST.get('currListID')
            currList = List.objects.get(pk=int(listID))
            Item.objects.create(name=itemName, cost=itemCost, note="",
                                priority=itemPriority, list=currList)

        elif request.POST.get('itemId') is not None:
            itemID = int(request.POST.get('itemId'))
            Item.objects.get(pk=itemID).delete()
