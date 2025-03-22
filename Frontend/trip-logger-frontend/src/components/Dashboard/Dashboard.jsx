import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    currentTrip: null,
    hoursOfService: 0,
    nextStop: null,
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dashboard/")
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  return (
    <div className="dashboard-grid">
      <div className="map-section">
        <MapContainer
          center={[39.8283, -98.5795]}
          zoom={4}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {dashboardData.currentTrip && (
            <Marker
              position={[
                dashboardData.currentTrip.pickup_location_lat,
                dashboardData.currentTrip.pickup_location_lon,
              ]}
            >
              <Popup>
                <strong>{dashboardData.currentTrip.driver_name}</strong>
                <p>Pickup: {dashboardData.currentTrip.pickup_location}</p>
                <p>Dropoff: {dashboardData.currentTrip.dropoff_location}</p>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <div className="trip-summary">
        <h2>Current Trip</h2>
        {dashboardData.currentTrip ? (
          <div className="summary-details">
            <div className="detail-item">
              <label>Pickup:</label>
              <span>{dashboardData.currentTrip.pickup_location}</span>
            </div>
            <div className="detail-item">
              <label>Dropoff:</label>
              <span>{dashboardData.currentTrip.dropoff_location}</span>
            </div>
            <div className="detail-item">
              <label>Distance:</label>
              <span>{dashboardData.currentTrip.distance} miles</span>
            </div>
            <div className="detail-item">
              <label>ETA:</label>
              <span>{dashboardData.currentTrip.estimated_time}h</span>
            </div>
          </div>
        ) : (
          <p>No active trip</p>
        )}
      </div>

      <div className="hos-timer">
        <h2>Hours of Service</h2>
        <div className="timer-display">
          <div className="time-remaining">{dashboardData.hoursOfService}</div>
          <div className="label">Hours Remaining</div>
        </div>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${(dashboardData.hoursOfService / 11) * 100}%` }}
          />
        </div>
      </div>

      <div className="next-stop">
        <h2>Next Stop</h2>
        {dashboardData.nextStop ? (
          <div className="stop-info">
            <div className="stop-type">{dashboardData.nextStop.type}</div>
            <div className="stop-distance">
              {dashboardData.nextStop.distance} miles ahead
            </div>
            <div className="stop-eta">{dashboardData.nextStop.eta}</div>
          </div>
        ) : (
          <p>No stops planned</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
