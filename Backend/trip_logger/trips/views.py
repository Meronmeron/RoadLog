from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Trip, DailyLog
from .serializers import TripSerializer, DailyLogSerializer

@api_view(['GET'])
def dashboard_data(request):
    latest_trip = Trip.objects.last()
    latest_log = DailyLog.objects.filter(trip=latest_trip).order_by('-date').first()

    return Response({
        'latest_trip': TripSerializer(latest_trip).data if latest_trip else None,
        'latest_log': DailyLogSerializer(latest_log).data if latest_log else None
    })

@api_view(['POST'])
def create_trip(request):
    serializer = TripSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def create_daily_log(request):
    serializer = DailyLogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_logs(request, trip_id):
    logs = DailyLog.objects.filter(trip_id=trip_id)
    serializer = DailyLogSerializer(logs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_reports(request):
    trips = Trip.objects.all()
    serializer = TripSerializer(trips, many=True)
    return Response(serializer.data)
