from rest_framework import serializers
from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'host', 'text', 'done', 'created_at')


class CreateItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('text', 'done')


class UpdateItemSerializer(serializers.ModelSerializer):
    id = serializers.CharField(validators=[])

    class Meta:
        model = Item
        fields = ('text', 'done', 'id')
