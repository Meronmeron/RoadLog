import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css"; // We'll create this file next
import TripList from "./TripList";
const App = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/trip/trips/")
      .then((res) => setTrips(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Trip Logger</h1>
      </header>
      <main className="main-content">
        <div className="map-container">
          <MapContainer
            center={[39.8283, -98.5795]}
            zoom={4}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {trips.map((trip) => (
              <Marker
                position={[
                  trip.current_location.lat,
                  trip.current_location.lon,
                ]}
                key={trip.id}
              >
                <Popup>
                  <div className="popup-content">
                    <strong>{trip.driver_name}</strong>
                    <p>From: {trip.pickup_location}</p>
                    <p>To: {trip.dropoff_location}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <TripList />
      </main>
    </div>
  );
};

export default App;
