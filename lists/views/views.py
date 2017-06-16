from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from lists.models import List
from lists.serializers import ListSerializer


class AllListView(ListAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer

class UserListView(APIView):
    @staticmethod
    def get(request):
        """
        List posts
        """

        lists = List.objects.all()
        return Response(ListSerializer(lists, many=True).data)

