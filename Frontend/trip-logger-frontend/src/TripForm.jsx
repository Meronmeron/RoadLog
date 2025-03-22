import React, { useState } from "react";
import axios from "axios";

const TripForm = ({ onTripCreated }) => {
  const [tripData, setTripData] = useState({
    driver_name: "",
    current_location: "",
    pickup_location: "",
    dropoff_location: "",
    current_cycle_used: "",
  });

  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/trip/trips/",
        tripData
      );
      onTripCreated(response.data); // Callback to update trip list
      alert("Trip Created Successfully!");
    } catch (error) {
      console.error("Error creating trip", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="driver_name"
        placeholder="Driver Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="current_location"
        placeholder="Current Location"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="pickup_location"
        placeholder="Pickup Location"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="dropoff_location"
        placeholder="Dropoff Location"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="current_cycle_used"
        placeholder="Current Cycle Used (Hrs)"
        onChange={handleChange}
        required
      />
      <button type="submit">Create Trip</button>
    </form>
  );
};

export default TripForm;
