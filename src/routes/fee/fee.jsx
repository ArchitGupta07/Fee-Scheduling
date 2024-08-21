import React, { useEffect, useState } from "react";
import "./fee.css";
import { useNavigate, useParams } from "react-router-dom";
import { diseaseYearlyFiles } from "../../lib/mockData";
import { getFiles, UploadFile } from "../../api/api";

const Fee = () => {
  const { stateName, category } = useParams();
  const [files, setFiles] = useState({});
  const [uploadFile, setUploadFile] = useState(null);
  const navigate = useNavigate();

  // Filter the data based on the disease from the URL
  //   const filteredData = diseaseYearlyFiles.filter((entry) =>
  //     entry.tableName.includes(disease)
  //   );

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("sending params", stateName.toLowerCase(), category);
        const myFiles = await getFiles(stateName.toLowerCase(), category);
        console.log("my files", myFiles);

        setFiles(myFiles);
        console.log(files.length);
      } catch (error) {
        console.log(error);
        alert("An error occurred in fetching uploaded files."); // Use alert for feedback
      }
    };

    fetchData();
  }, []);

  const OpenFile = (tableName, id, isapproved) => {
    // navigate(`/table/${encodeURIComponent(tableName)}`, {
    //   // state: { active_cols },
    // });
    navigate(
      `/table/${encodeURIComponent(tableName)}?id=${encodeURIComponent(
        id
      )}&isapproved=${encodeURIComponent(isapproved)}`
    );
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0]; // Get the first uploaded file
    setUploadFile(uploadedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!uploadFile) {
      alert("Please select a file to upload."); // Use alert for feedback
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadFile); // Append the selected file
    formData.append("stateName", stateName);
    formData.append("category", category);

    try {
      const res = await UploadFile(formData);
      OpenFile(res.table_name, res.version_id, true);
    } catch (error) {
      console.error(error);
      alert("An error occurred while uploading the file.");
    }
  };

  console.log("length", files.length, files);
  return (
    <section className="fee-section">
      {(!files ||
        (typeof files === "object" && Object.keys(files).length === 0)) && (
        <div>
          <h1>Upload File</h1>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileUpload} />
            <button type="submit">Upload</button>
          </form>
        </div>
      )}
      <div className="fee-table">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>File Name</th>
              <th>isApproved</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(files).length > 0 ? (
              Object.keys(files).map((fileNo, index) => {
                // Access the file entry using the key
                const fileEntry = files[fileNo];
                console.log("file entry ", fileEntry);
                return (
                  <tr key={index}>
                    <td>{fileEntry.date}</td>
                    <td>{fileEntry.file_name}</td>
                    <td>{fileEntry.isapproved.toString()}</td>
                    <td>
                      <button
                        onClick={() =>
                          OpenFile(
                            fileEntry.table_name,
                            fileEntry.id,
                            fileEntry.isapproved.toString()
                          )
                        }
                      >
                        Open File
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Fee;
