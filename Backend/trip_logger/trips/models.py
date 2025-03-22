from django.db import models

# Create your models here.
from django.db import models

class Trip(models.Model):
    driver_name = models.CharField(max_length=100)
    current_location = models.CharField(max_length=255)
    pickup_location = models.CharField(max_length=255)
    dropoff_location = models.CharField(max_length=255)
    current_cycle_used = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
