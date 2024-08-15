import React, { useEffect, useState } from "react";
import "./fee.css";
import { useNavigate, useParams } from "react-router-dom";
import { diseaseYearlyFiles } from "../../lib/mockData";
import { getFiles } from "../../api/api";

const Fee = () => {
  const { stateName, category } = useParams();
  const [files, setFiles] = useState([]);
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
        console.log(myFiles);

        setFiles(myFiles);
        console.log(files.length);
      } catch (error) {
        console.log(error);
        alert("An error occurred in fetching uploaded files."); // Use alert for feedback
      }
    };

    fetchData();
  }, []);

  const OpenFile = (tableName) => {
    navigate(`/table/${encodeURIComponent(tableName)}`);
  };

  return (
    <section className="fee-section">
      <div className="fee-table">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>File Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(files).length > 0 ? (
              Object.keys(files).map((fileNo, index) => {
                // Access the file entry using the key
                const fileEntry = files[fileNo];
                return (
                  <tr key={index}>
                    <td>{fileEntry.date}</td>
                    <td>{fileEntry.file_name}</td>
                    <td>
                      <button onClick={() => OpenFile(fileEntry.table_name)}>
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
