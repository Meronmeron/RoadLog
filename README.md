# RouteLogix - Truck Driver ELD & Route Planner

## 🚛 Overview

RouteLogix is a web application designed to help truck drivers efficiently plan their trips, track their hours of service, and generate ELD (Electronic Logging Device) logs. The app provides:

- Route planning with rest and fuel stops using a free map API.
- ELD-compliant log sheets that can be downloaded as PDFs.
- A Django backend with a React frontend.

---

## 🛠 Tech Stack

- **Backend:** Django, Django REST Framework (DRF), PostgreSQL
- **Frontend:** React, Leaflet.js (for mapping), Axios
- **Authentication:** Django JWT
- **PDF Generation:** jsPDF, html2canvas
- **Map API:** OpenStreetMap / OpenRouteService

---

## 📦 Features

- **Trip Management:**
  - Enter trip details: Current location, pickup location, drop-off location, and cycle hours.
  - View routes with stops and fuel stations.
  - Generate and download ELD log sheets.
- **Interactive Map:**
  - Displays the planned route with waypoints.
  - Shows rest stops and fueling points.
- **ELD Log Sheets:**
  - Auto-generates log sheets based on trip details.
  - Download logs as PDF.

---

## 🚀 Getting Started

### 1️⃣ Backend Setup (Django)

#### Prerequisites:

- Python 3.x
- PostgreSQL
- Virtual environment (optional)

#### Installation:

```bash
# Clone the repo
git clone https://github.com/Meronmeron/RoadLog.git
cd RoadLog

# Create virtual environment
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start the Django server
python manage.py runserver
```

---

### 2️⃣ Frontend Setup (React)

#### Prerequisites:

- Node.js & npm

#### Installation:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the React app
npm start
```

---

## 🗺️ API Endpoints (Django Backend)

### **Trip Management**

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| GET    | `/api/trips/`      | List all trips        |
| POST   | `/api/trips/`      | Create a new trip     |
| GET    | `/api/trips/{id}/` | Retrieve trip details |

---

## 🏗 Future Improvements

- ✅ Real-time GPS tracking
- ✅ Integration with trucking regulations (HOS compliance)
- ✅ User authentication & profile management
- ✅ Mobile-friendly design

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 💬 Contributing

Pull requests are welcome! Please open an issue for discussions.

---

## 📧 Contact

For inquiries, contact **your-email@example.com** or visit our [GitHub Repo](https://github.com/Meronmeron/RoadLog.git).
