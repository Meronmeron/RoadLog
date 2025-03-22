from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.dashboard_data, name='dashboard'),
    path('trips/', views.create_trip, name='create-trip'),
    path('logs/', views.create_daily_log, name='create-daily-log'),
    path('logs/<int:trip_id>/', views.get_logs, name='get-logs'),
    path('reports/', views.get_reports, name='get-reports'),
] 