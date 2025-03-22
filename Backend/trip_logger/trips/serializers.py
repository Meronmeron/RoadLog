from rest_framework import serializers
from .models import Trip, DailyLog

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'

class DailyLogSerializer(serializers.ModelSerializer):
    trip_id = serializers.PrimaryKeyRelatedField(
        queryset=Trip.objects.all(), source="trip"
    )

    class Meta:
        model = DailyLog
        fields = ['id', 'trip_id', 'date', 'driving_hours', 'rest_hours', 'fuel_stops']

