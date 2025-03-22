import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Logsheet = ({ trip }) => {
  const sheetRef = useRef();

  const downloadLog = () => {
    html2canvas(sheetRef.current).then((canvas) => {
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10);
      pdf.save("log-sheet.pdf");
    });
  };

  return (
    <div ref={sheetRef} style={{ padding: "20px", border: "1px solid black" }}>
      <h3>Driver: {trip.driver_name}</h3>
      <p>Current Cycle: {trip.current_cycle_used} hrs</p>
      <p>
        Route: {trip.pickup_location} → {trip.dropoff_location}
      </p>
      <button onClick={downloadLog}>Download Log Sheet</button>
    </div>
  );
};

export default Logsheet;
