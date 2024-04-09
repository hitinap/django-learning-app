from django.urls import path
from .views import ItemView, CreateItemView

urlpatterns = [
    path('item', ItemView.as_view()),
    path('item/create', CreateItemView.as_view()),
]
