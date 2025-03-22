import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import axios from "axios";
import { message } from "antd";
import "./NewTrip.css";

const NewTrip = () => {
  const [tripData, setTripData] = useState({
    driver_name: "",
    pickup_location: "",
    dropoff_location: "",
    distance: 0,
    estimated_time: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/trips/",
        tripData
      );

      console.log("Trip created:", response.data);
      message.success("Trip created successfully!");
      // Reset form data
      setTripData({
        driver_name: "",
        pickup_location: "",
        dropoff_location: "",
        distance: 0,
        estimated_time: 0,
      });
    } catch (error) {
      console.error("Error creating trip:", error);
      message.error("Failed to create trip. Please try again.");
    }
  };

  return (
    <div className="new-trip-container">
      <div className="form-section">
        <h2>Create New Trip</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Driver Name</label>
            <input
              type="text"
              value={tripData.driver_name}
              onChange={(e) =>
                setTripData({ ...tripData, driver_name: e.target.value })
              }
              placeholder="Enter driver name"
            />
          </div>

          <div className="form-group">
            <label>Pickup Location</label>
            <input
              type="text"
              value={tripData.pickup_location}
              onChange={(e) =>
                setTripData({ ...tripData, pickup_location: e.target.value })
              }
              placeholder="Enter pickup location"
            />
          </div>

          <div className="form-group">
            <label>Dropoff Location</label>
            <input
              type="text"
              value={tripData.dropoff_location}
              onChange={(e) =>
                setTripData({ ...tripData, dropoff_location: e.target.value })
              }
              placeholder="Enter dropoff location"
            />
          </div>

          <div className="form-group">
            <label>Distance (miles)</label>
            <input
              type="number"
              value={tripData.distance}
              onChange={(e) =>
                setTripData({
                  ...tripData,
                  distance: parseFloat(e.target.value),
                })
              }
              placeholder="Enter distance"
            />
          </div>

          <div className="form-group">
            <label>Estimated Time (hours)</label>
            <input
              type="number"
              value={tripData.estimated_time}
              onChange={(e) =>
                setTripData({
                  ...tripData,
                  estimated_time: parseFloat(e.target.value),
                })
              }
              placeholder="Enter estimated time"
            />
          </div>

          <button type="submit" className="generate-route-btn">
            Create Trip
          </button>
        </form>
      </div>

      <div className="route-preview">
        <div className="map-container">
          <MapContainer
            center={[39.8283, -98.5795]}
            zoom={4}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </div>

        <div className="route-details">
          <h3>Route Summary</h3>
          <div className="detail-row">
            <span>Total Distance:</span>
            <span>-- miles</span>
          </div>
          <div className="detail-row">
            <span>Estimated Time:</span>
            <span>-- hours</span>
          </div>
          <div className="detail-row">
            <span>Required Stops:</span>
            <span>--</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTrip;
