from django.shortcuts import render
from rest_framework import generics, status
from .models import Item
from .serializers import ItemSerializer, CreateItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class ItemView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class CreateItemView(APIView):
    serializer_class = CreateItemSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            text = serializer.data.get('text')
            done = serializer.data.get('done')
            host = self.request.session.session_key
            # ???: В этом месте мы проверяем уникальность предмета, для обучения у 1 пользователя не может быть более 1 предмета в списке
            queryset = Item.objects.filter(host=host)
            if queryset.exists():
                item = queryset[0]
                item.text = text
                item.done = done
                item.save(update_fields=['text', 'done'])
            else:
                item = Item(host=host, text=text, done=done)
                item.save()

        return Response(ItemSerializer(item).data, status=status.HTTP_201_CREATED)
