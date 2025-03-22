import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Reports.css";

const Reports = () => {
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [reports, setReports] = useState([]);
  const [summary, setSummary] = useState({
    totalTrips: 0,
    totalMiles: 0,
    totalHours: 0,
  });

  useEffect(() => {
    fetchReports();
  }, [dateRange]);

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/reports/", {
        params: {
          start_date: dateRange.start,
          end_date: dateRange.end,
          search: searchTerm,
        },
      });
      setReports(response.data.reports);
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleExport = async (format) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/reports/export/${format}/`,
        {
          params: {
            start_date: dateRange.start,
            end_date: dateRange.end,
          },
          responseType: "blob",
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(`Error exporting as ${format}:`, error);
    }
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h2>Trip Reports</h2>
        <div className="export-buttons">
          <button onClick={() => handleExport("pdf")}>Export PDF</button>
          <button onClick={() => handleExport("csv")}>Export CSV</button>
        </div>
      </div>

      <div className="filters-section">
        <div className="date-filters">
          <div className="filter-group">
            <label>Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
          </div>
          <div className="filter-group">
            <label>End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </div>
        </div>
        <div className="search-filter">
          <label>Search Trip ID</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (!e.target.value) fetchReports();
            }}
            onKeyPress={(e) => e.key === "Enter" && fetchReports()}
            placeholder="Enter Trip ID..."
          />
        </div>
      </div>

      <div className="reports-table">
        <div className="table-header">
          <div>Trip ID</div>
          <div>Date</div>
          <div>Miles Driven</div>
          <div>Hours</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {reports.map((report) => (
          <div key={report.id} className="table-row">
            <div>{report.id}</div>
            <div>{report.date}</div>
            <div>{report.miles} mi</div>
            <div>{report.hours}h</div>
            <div>
              <span className={`status-badge ${report.status.toLowerCase()}`}>
                {report.status}
              </span>
            </div>
            <div className="actions">
              <button
                className="view-btn"
                onClick={() => {
                  /* Handle view action */
                }}
              >
                View
              </button>
              <button
                className="download-btn"
                onClick={() => handleExport("pdf", report.id)}
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="reports-summary">
        <div className="summary-card">
          <h3>Period Summary</h3>
          <div className="summary-stats">
            <div className="stat-item">
              <label>Total Trips</label>
              <span>{summary.totalTrips}</span>
            </div>
            <div className="stat-item">
              <label>Total Miles</label>
              <span>{summary.totalMiles}</span>
            </div>
            <div className="stat-item">
              <label>Total Hours</label>
              <span>{summary.totalHours}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
