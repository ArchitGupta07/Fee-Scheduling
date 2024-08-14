import React from "react";
import "./fee.css";
import { useParams } from "react-router-dom";
import { diseaseYearlyFiles } from "../../lib/mockData";

const Fee = () => {
  const { stateName, disease } = useParams();

  // Filter the data based on the disease from the URL
  //   const filteredData = diseaseYearlyFiles.filter((entry) =>
  //     entry.tableName.includes(disease)
  //   );

  console.log(stateName, disease);

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
            {diseaseYearlyFiles.map((entry, index) => {
              const year = entry.tableName.split("_")[1];
              return (
                <tr key={index}>
                  <td>{year}</td>
                  <td>{entry.fileName}</td>
                  <td>
                    <button onClick={() => downloadFile(entry.fileName)}>
                      Download
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );

  function downloadFile(fileName) {
    console.log(`Downloading file: ${fileName}`);
    // Implement the actual file download logic here
  }
};

export default Fee;
