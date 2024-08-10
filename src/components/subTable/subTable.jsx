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

  return (
    <table
      className={`custom-table ${
        tableType === "DELETE" ? "delete-columns" : ""
      }`}
    >
      <thead>
        <tr>
          {Array.from(cols).map((col, indx) => (
            <th key={indx}>{col.toUpperCase()}</th>
          ))}
          {/* <th>Hash Value</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th> */}
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([hash, details]) => (
          <tr key={hash}>
            {Object.values(details).map((value, indx) => (
              <th key={indx}>{value}</th>
            ))}
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
