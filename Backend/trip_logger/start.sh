   #!/bin/bash
   python manage.py migrate
   gunicorn trip_logger.wsgi:application --bind 0.0.0.0:8000