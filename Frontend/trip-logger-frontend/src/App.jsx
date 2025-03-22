import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/Layout/DashboardLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import NewTrip from "./components/Trip/NewTrip";
import DailyLogs from "./components/Logs/DailyLogs";
import Reports from "./components/Reports/Reports";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/new-trip"
        element={
          <DashboardLayout>
            <NewTrip />
          </DashboardLayout>
        }
      />
      <Route
        path="/logs"
        element={
          <DashboardLayout>
            <DailyLogs />
          </DashboardLayout>
        }
      />
      <Route
        path="/reports"
        element={
          <DashboardLayout>
            <Reports />
          </DashboardLayout>
        }
      />
    </Routes>
  );
};

export default App;
