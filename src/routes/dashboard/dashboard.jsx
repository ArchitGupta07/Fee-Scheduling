// src/App.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import { getFileData, getMyFiles, UploadFile } from "../../api/api";

const Dashboard = () => {
  const [allFiles, setAllFiles] = useState([]);
  const [file, setFile] = useState(null); // Single file state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myFiles = await getMyFiles();
        setAllFiles(myFiles);
      } catch (error) {
        alert("An error occurred in fetching uploaded files."); // Use alert for feedback
      }
    };

    fetchData();
  }, []);

  const goToFile = async (tableName) => {
    const fileData = await getFileData(tableName);

    const data = Object.entries(fileData.data).reduce(
      (acc, [hash, details]) => {
        acc[hash] = { hash, ...details };
        return acc;
      },
      {}
    );

    navigate("/table", { state: { data, tableName } });
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0]; // Get the first uploaded file
    setFile(uploadedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file to upload."); // Use alert for feedback
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append the selected file

    try {
      const res = await UploadFile(formData);
      goToFile(res.table_name);
      // const fileData = await getFileData(res.table_name);

      // const data = Object.entries(fileData.data).reduce(
      //   (acc, [hash, details]) => {
      //     acc[hash] = { hash, ...details };
      //     return acc;
      //   },
      //   {}
      // );

      // navigate("/table", { state: { data } }); // Pass data to the next page
    } catch (error) {
      console.error(error);
      alert("An error occurred while uploading the file."); // Use alert for feedback
    }
  };

  const handleActionClick = async (tableName) => {
    goToFile(tableName);
  };

  return (
    <section>
      <div>
        <h1>Upload File</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileUpload} />
          <button type="submit">Upload</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allFiles &&
            allFiles.map((file, index) => (
              <tr key={index}>
                <td>{file.file_name}</td>
                <td>
                  <button onClick={() => handleActionClick(file.table_name)}>
                    View Table
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default Dashboard;
