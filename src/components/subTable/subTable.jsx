import React, { useEffect, useState } from "react";
import "./subTable.css"; // Import the CSS file

const SubTable = ({ tableType, data }) => {
  //

  const [cols, setCols] = useState(new Set());

  useEffect(() => {
    const columns = new Set();

    Object.values(data).forEach((row) => {
      Object.keys(row).forEach((col) => {
        columns.add(col);
      });
    });

    setCols(columns);
  }, [data]);

  console.log("data..............", data);

  return (
    <table
      className={`custom-table ${
        tableType === "DELETE" ? "delete-columns" : ""
      }`}
    >
      <thead>
        <tr>
          {Array.from(cols).map((col, indx) => {
            if (col.toLowerCase() !== "hash") {
              return <th key={indx}>{col.toUpperCase()}</th>;
            }
          })}
          {/* <th>Hash Value</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th> */}
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([hash, details]) => (
          <tr key={hash}>
            {Object.keys(details).map((key, indx) => {
              if (key.toLowerCase() !== "hash") {
                return (
                  <th key={indx}>{details[key] != -1 ? details[key] : ""}</th>
                );
              }
            })}
            {/* <td>{hash}</td>
            <td>{details.name}</td>
            <td>{details.age}</td>
            <td>{details.email}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubTable;
