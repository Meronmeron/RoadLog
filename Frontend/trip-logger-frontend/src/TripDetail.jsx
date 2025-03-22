import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Logsheet from "./Logsheet";

const TripDetail = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/trips/${tripId}/`)
      .then((res) => setTrip(res.data))
      .catch((err) => console.error(err));
  }, [tripId]);

  if (!trip) return <p>Loading trip details...</p>;

  return (
    <div>
      <h2>Trip Details</h2>
      <p>
        <strong>Driver:</strong> {trip.driver_name}
      </p>
      <p>
        <strong>Route:</strong> {trip.pickup_location} → {trip.dropoff_location}
      </p>
      <p>
        <strong>Current Cycle:</strong> {trip.current_cycle_used} hrs
      </p>

      {/* Render LogSheet component */}
      <LogSheet trip={trip} />
    </div>
  );
};

export default TripDetail;
