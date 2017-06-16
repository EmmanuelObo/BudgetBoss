from lists.models import List
from items.models import Item
from rest_framework import serializers


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = '__all__'
