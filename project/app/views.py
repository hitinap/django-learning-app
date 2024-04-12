from django.shortcuts import render
from rest_framework import generics, status
from .models import Item
from .serializers import ItemSerializer, CreateItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

# Create your views here.
class ItemView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class GetItem(APIView):
    serializer_class = ItemSerializer
    lookup_url_kwarg = 'id'

    def get(self, request, format=None):
        _id = request.GET.get(self.lookup_url_kwarg)
        if _id is not None:
            item = Item.objects.filter(id=_id)
            if len(item) > 0:
                data = ItemSerializer(item[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Item not found': 'Invalid item id.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad request': 'Id not found in request.'}, status=status.HTTP_400_BAD_REQUEST)


class SearchItemView(APIView):
    lookup_url_kwarg = 'id'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        _id = request.data.get(self.lookup_url_kwarg)
        if _id is not None:
            item_result = Item.objects.filter(id=_id)
            if len(item_result) > 0:
                item = item_result[0]
                self.request.session['item_id'] = _id
                return Response({'message': 'Item found!'}, status=status.HTTP_200_OK)
            return Response({'Bad request': 'Invalid item id'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad request': 'Invalid post data, id not found'}, status=status.HTTP_404_NOT_FOUND)


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
                self.request.session['item_id'] = item.id
            else:
                item = Item(host=host, text=text, done=done)
                item.save()
                self.request.session['item_id'] = item.id

        return Response(ItemSerializer(item).data, status=status.HTTP_201_CREATED)


class ItemOnUser(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data = {'id': self.request.session.get('item_id')}
        return JsonResponse(data, status=status.HTTP_200_OK)


class LeaveItem(APIView):
    def post(self, request, format=None):
        if 'item_id' in self.request.session:
            _id = self.request.session.pop('item_id')
            host_id = self.request.session.session_key
            item_results = Item.objects.filter(host=host_id)
            if len(item_results) > 0:
                item = item_results[0]
                item.delete()

        return Response({'message': 'Success'}, status=status.HTTP_200_OK)
