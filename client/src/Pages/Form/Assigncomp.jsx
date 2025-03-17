// import { number } from "prop-types";
import React, { useState, useEffect } from "react";

const Assigncomp = ({number}) => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jobhub-project-official-1.onrender.com/api/v1/admins/alljobs"
        );
        const result = await response.json();
        console.log("API Response:", result);

        // Ensure the response structure matches
        if (result && Array.isArray(result.jobs)) {
          setData(result.jobs);
        } else {
          throw new Error("Unexpected API response structure");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle row selection
  const handleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Handle "Select All" toggle
  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row._id));
    }
  };

  // Function to open WhatsApp with a message
  const sendMessage = (phoneNumber, message) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank"); // Open WhatsApp in a new tab
  };

  // Handle Send Button Click
  const handleSend = () => {
    const selectedData = data.filter((row) => selectedRows.includes(row._id));

    if (selectedData.length === 0) {
      alert("Please select at least one job to send.");
      return;
    }

    // Construct the message with selected job details
    const message = selectedData
      .map(
        (row, index) =>
          `${index + 1}. Company: ${row.companyName || "N/A"}\n   Job Title: ${row.jobTitle || "N/A"}\n   Positions: ${row.numberOfPosition || "N/A"}`
      )
      .join("\n\n");

 
    const phoneNumber = 91+number;

    sendMessage(phoneNumber, `Here are the selected job details:\n\n${message}`);
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Job Listings</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedRows.length === data.length && data.length > 0}
              />
            </th>
            <th>Company Name</th>
            <th>Job Title</th>
            <th>Number of Positions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row._id)}
                    onChange={() => handleRowSelection(row._id)}
                  />
                </td>
                <td>{row.companyName || "N/A"}</td>
                <td>{row.jobTitle || "N/A"}</td>
                <td>{row.numberOfPosition || "N/A"}</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={handleSend} style={{ marginTop: "20px" }}>
        Send via WhatsApp
      </button>
    </div>
  );
};

export default Assigncomp;
