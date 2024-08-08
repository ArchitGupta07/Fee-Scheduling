// src/App.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const [files, setFiles] = React.useState([]);
  const navigate = useNavigate(); // Correctly used within a component

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles(uploadedFiles);
  };

  const handleCardClick = async (file) => {
    // const response = await fetch("/api/getFileData", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ filename: file.name }),
    // });
    // const data = await response.json();
    const data = {
      1: { id: 1, name: "John Doe", email: "john@example.com" },
      2: { id: 2, name: "Jane Smith", email: "jane@example.com" },
      3: { id: 3, name: "Michael Brown", email: "michael@example.com" },
    };
    navigate("/table", { state: { data } }); // Navigate to the Table component
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <input type="file" multiple onChange={handleFileUpload} />
      <div className="card-container">
        {files.map((file) => (
          <div
            key={file.name}
            className="card"
            onClick={() => handleCardClick(file)}
          >
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
