from django.urls import path
from .views import ItemView, CreateItemView, GetItem

urlpatterns = [
    path('item', ItemView.as_view()),
    path('item/create', CreateItemView.as_view()),
    path('item/get', GetItem.as_view()),
]
