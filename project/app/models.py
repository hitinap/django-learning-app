from django.db import models

# Create your models here.
class Item(models.Model):
    text = models.CharField(max_length=200)
    done = models.BooleanField(null=False, default=False)
    created_at = models.DateTimeField(auto_now_add=True)
