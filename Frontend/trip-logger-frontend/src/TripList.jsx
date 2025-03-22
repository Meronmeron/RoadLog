import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TripForm from "./TripForm";

const TripList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get("http://localhost:8000/trip/trips/");
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips", error);
    }
  };

  return (
    <div>
      <h2>Available Trips</h2>
      <TripForm onTripCreated={fetchTrips} />
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            {trip.driver_name} - {trip.pickup_location} →{" "}
            {trip.dropoff_location}
            <Link to={`/trip/${trip.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
