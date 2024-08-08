// src/Table.js
import React, { useState, useEffect } from "react";
// import { columnChanges } from "./columnChanges";
import "./Table.css";
import { cellChanges, columnChanges } from "../../lib/mockData";

const Table = () => {
  // const Table = ({ data }) => {
  const data = {
    1: { id: 1, name: "John Doe", email: "john@example.com" },
    2: { id: 2, name: "Jane Smith", email: "jane@example.com" },
    3: { id: 3, name: "Michael Brown", email: "michael@example.com" },
  };
  const [oldColumns, setOldColumns] = useState(
    Object.keys(Object.values(data)[0] || {})
  );
  const [allColumns, setAllColumns] = useState([]);
  const [newColumns, setNewColumns] = useState([]);
  const [newData, setNewData] = useState({});
  const [newRows, setNewRows] = useState({});

  useEffect(() => {
    const newCols = columnChanges
      .filter((change) => change.type === "ADD")
      .flatMap((change) => change.columns);

    setNewColumns(newCols);

    const newData = Object.values(data).reduce((acc, row) => {
      const newRow = { ...row };
      newCols.forEach((col) => {
        newRow[col] = ""; // Set default value for new columns
      });
      acc[row.id] = newRow; // Use id as the key
      return acc;
    }, {});

    let newRowData = {};

    cellChanges.forEach((cellChange) => {
      const { id, column_name, new_value } = cellChange;
      const rowIndex = id; // assuming row_name is 1-based index
      if (newData[rowIndex]) {
        if (newCols.includes(column_name)) {
          newData[rowIndex][column_name] = new_value;
        } else {
          newRowData[rowIndex] = {};
          newRowData[rowIndex][column_name] = new_value;
        }
      }
    });
    let columns = [];
    Object.keys(newData).forEach((indx) => {
      if (newRowData[indx]) {
        Object.keys(newData[indx]).forEach((col) => {
          columns.push(col);
          if (!newRowData[indx][col]) {
            newRowData[indx][col] = newData[indx][col];
          }
        });
      }
    });
    setAllColumns(columns);
    setNewData(newData);
    setNewRows(newRowData);

    console.log(columns);
  }, []);

  return (
    <div>
      <h2>Old Columns</h2>
      <table>
        <thead>
          <tr>
            {oldColumns.map((key) => (
              <th key={key}>{key}</th>
            ))}
            {newColumns.map((key) => (
              <th className="new-columns" key={key}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(newData).map((rowIndx) => (
            <React.Fragment key={rowIndx}>
              <tr>
                {oldColumns.map((col, idx) => (
                  <td key={idx}>
                    {newData[rowIndx][col] !== undefined
                      ? newData[rowIndx][col]
                      : ""}
                  </td>
                ))}
                {newColumns.map((col, idx) => (
                  <td className="new-column-values" key={idx}>
                    {newData[rowIndx][col] !== undefined
                      ? newData[rowIndx][col]
                      : ""}
                  </td>
                ))}
              </tr>
              {newRows[rowIndx] && (
                <tr>
                  {allColumns.map((col, index) => (
                    <td className="new-row-values" key={index}>
                      {newRows[rowIndx][col] !== undefined
                        ? newRows[rowIndx][col]
                        : ""}
                    </td>
                  ))}
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
