from django.db import models

class Trip(models.Model):
    driver_name = models.CharField(max_length=100)
    pickup_location = models.CharField(max_length=255)
    dropoff_location = models.CharField(max_length=255)
    distance = models.FloatField()
    estimated_time = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

class DailyLog(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='logs')
    date = models.DateField()
    driving_hours = models.FloatField()
    rest_hours = models.FloatField()
    fuel_stops = models.IntegerField()
