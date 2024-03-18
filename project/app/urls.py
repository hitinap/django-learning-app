from django.urls import path
from .views import ItemView

urlpatterns = [
    path('item', ItemView.as_view()),
]
