from django.urls import path
from .views import ItemView, CreateItemView, GetItem, SearchItemView, ItemOnUser, LeaveItem

urlpatterns = [
    path('item', ItemView.as_view()),
    path('item/create', CreateItemView.as_view()),
    path('item/get', GetItem.as_view()),
    path('search', SearchItemView.as_view()),
    path('item/on-user', ItemOnUser.as_view()),
    path('item/leave', LeaveItem.as_view()),
]
