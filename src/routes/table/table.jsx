// src/Table.js
import React, { useState, useEffect } from "react";
// import { columnChanges } from "./columnChanges";
import "./table.css";
import { cellChanges, columnChanges, tableChanges } from "../../lib/mockData";
import { useLocation, useParams } from "react-router-dom";
import SubTable from "../../components/subTable/subTable";
import { Operations } from "../../lib/enum";
import {
  applyFileChanges,
  CompareFile,
  getFileData,
  getNewChanges,
} from "../../api/api";
import { DownloadFile } from "../../api/api";
// import { cellChanges, columnChanges } from "../../lib/mockData";

const Table = () => {
  const { tableName } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const isapproved = queryParams.get("isapproved") === "true";

  const [data, setData] = useState({});

  const [oldColumns, setOldColumns] = useState([]);
  const [allColumns, setAllColumns] = useState([]);
  const [newColumns, setNewColumns] = useState([]);
  const [newData, setNewData] = useState({});
  const [updatedRows, setUpdatedRows] = useState({});
  const [newRows, setNewRows] = useState({});
  const [deletedRows, setDeletedRows] = useState({});
  const [tableChanges, setTableChanges] = useState([]);
  const [cellChanges, setCellChanges] = useState([]);
  const [deletedCols, setDeletedCols] = useState([]);

  const [file, setFile] = useState(null); // Single file state
  console.log(id, isapproved);
  console.log(cellChanges);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0]; // Get the first uploaded file
    setFile(uploadedFile);
  };

  // let deletedCols = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fileData = await getFileData(tableName, id);
        // console.log("isapproved", isapproved);

        const tabledata = Object.entries(fileData.data).reduce(
          (acc, [hash, details]) => {
            acc[hash] = { hash, ...details };

            // console.log("acc", hash);
            return acc;
          },
          {}
        );

        // setOldColumns(Object.keys(Object.values(tabledata)[0]));
        // console.log(fileData.active_columns);
        setOldColumns(fileData.active_columns);
        setData(tabledata);
      } catch (error) {
        console.log(error);
        alert("An error occurred in fetching uploaded files."); // Use alert for feedback
      }
    };

    const updateCellChanges = async () => {
      console.log("ID before condition:", typeof id);
      if (id !== "undefined" && id !== null && !isapproved) {
        console.log("Unapproved");
        const unapprovedChanges = await getNewChanges(id);
        console.log(unapprovedChanges);
        setCellChanges(unapprovedChanges.cell_changes);
        setTableChanges(unapprovedChanges.table_changes);
      }
    };

    fetchData();
    updateCellChanges();
  }, [tableName]);

  useEffect(() => {
    console.log("cell changes triggered");
    console.log(tableChanges);
    const deleteHashes = tableChanges
      ? tableChanges
          .filter(
            (entry) =>
              entry.type === "ROW" && entry.operations === Operations.DELETE
          )
          .flatMap((entry) => {
            try {
              // Attempt to parse the values and extract column names
              return Object.keys(JSON.parse(entry.values));
            } catch (error) {
              console.error("Error parsing JSON:", error);
              // Fallback approach if parsing fails
              return Object.keys(entry.values);
            }
          })
      : [];

    const newCols = tableChanges
      ? tableChanges
          .filter(
            (change) =>
              change.type === "COLUMN" && change.operations === Operations.ADD
          )
          .flatMap((change) => {
            try {
              // Attempt to parse the values and extract column names
              return Object.keys(JSON.parse(change.values));
            } catch (error) {
              console.error("Error parsing JSON:", error);
              // Fallback approach if parsing fails
              return Object.keys(change.values);
            }
          })
      : [];
    const deleteCols = tableChanges
      ? tableChanges
          .filter(
            (change) =>
              change.type === "COLUMN" &&
              change.operations === Operations.DELETE
          )
          .flatMap((change) => {
            try {
              // Attempt to parse the values and extract column names
              return Object.keys(JSON.parse(change.values));
            } catch (error) {
              console.error("Error parsing JSON:", error);
              // Fallback approach if parsing fails
              return Object.keys(change.values);
            }
          })
      : [];

    // console.log("table changes", tableChanges);
    setNewColumns(newCols);
    setDeletedCols(deleteCols);

    const deletedRowsData = {};
    const newData = Object.values(data).reduce((acc, row) => {
      // console.log(row);
      const updatedRow = { ...row };
      newCols.forEach((col) => {
        updatedRow[col] = ""; // Set default value for new columns
      });
      if (deleteHashes.includes(row.hash)) {
        deletedRowsData[row.hash] = { ...row };
      } else {
        acc[row.hash] = updatedRow; // Use id as the key
      }
      return acc;
    }, {});

    // console.log(newData);

    let updatedRowData = {};
    let newRowData = {};
    //   {
    //     "id": 2,
    //     "comparison_id": "550e8400-e29b-41d4-a716-446655440002",
    //     "type": "INSERT",
    //     "row_name": 2,
    //     "column_name": "Age",
    //     "old_value": null,
    //     "new_value": 33
    // },

    console.log("cell.............", cellChanges);

    cellChanges?.forEach((cellChange) => {
      const { operations, row_name, column_name, new_value } = cellChange;

      // console.log(operations, row_name);
      const type = operations;
      const rowIndex = row_name; // assuming row_name is 1-based index
      // console.log(new_value);
      // console.log(updatedRowData);
      if (newData[rowIndex]) {
        if (type == Operations.UPDATE) {
          if (newCols.includes(column_name)) {
            newData[rowIndex][column_name] = new_value;
          } else {
            // console.log("yo2", rowIndex, column_name, new_value);

            // console.log(updatedRowData);
            updatedRowData[rowIndex] = updatedRowData[rowIndex] || {};
            updatedRowData[rowIndex][column_name] = new_value;
          }
        } else if (type == Operations.DELETE) {
        }
      } else {
        if (type == Operations.ADD) {
          if (!newRowData[rowIndex]) {
            newRowData[rowIndex] = {};
          }
          newRowData[rowIndex][column_name] = new_value;
        }
      }
    });

    // console.log("updates rows", updatedRowData);

    let columns = [];
    Object.keys(newData).forEach((indx) => {
      if (updatedRowData[indx]) {
        Object.keys(newData[indx]).forEach((col) => {
          columns.push(col);
          if (!updatedRowData[indx][col]) {
            updatedRowData[indx][col] = newData[indx][col];
          }
        });
      }
    });

    const uniqueColumns = [...new Set(columns)];
    setAllColumns(uniqueColumns);
    setNewData(newData);
    setUpdatedRows(updatedRowData);
    setNewRows(newRowData);
    setDeletedRows(deletedRowsData);

    // console.log("updated rows", updatedRows);

    // console.log("new Data", newData);
    // console.log("cell changes ", cellChanges);
    // console.log("new Row Data", newRowData);
    // console.log("Deleted Rows Data", deletedRowsData);
    // console.log("old columns", oldColumns);
  }, [data, cellChanges, tableChanges]);

  const handleCompare = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("cmp_file", file);

    try {
      const res = await CompareFile(formData, tableName);
      setCellChanges(res?.data.cell_changes);
      setTableChanges(res?.data.table_changes);
    } catch (error) {
      console.error(error);
      alert("An error occurred while uploading the file."); // Use alert for feedback
    }
  };

  async function handleDownload() {
    await DownloadFile(tableName);
  }

  // console.log("new..................", newData);

  const applyChanges = async () => {
    console.log(Object.keys(deletedRows), deletedCols, newColumns);
    try {
      const fileData = await applyFileChanges(
        tableName,
        deletedCols,
        newColumns
      );
    } catch (error) {
      console.log(error);
      alert("An error occurred in applying uploaded file changes."); // Use alert for feedback
    }
  };

  return (
    <section>
      <div className="action-center">
        <div>
          <h1 className="table-heads">Upload File</h1>
          <form onSubmit={handleCompare}>
            <input type="file" onChange={handleFileUpload} />
            <button type="submit">Upload</button>
          </form>
        </div>
        <button onClick={handleDownload}>Download Table</button>
        <button onClick={applyChanges}>Apply Changes</button>
      </div>
      <div>
        <h2 className="table-heads">MAIN TABLE</h2>
        <table>
          <thead>
            <tr>
              {oldColumns.map((key) => {
                if (key.toLowerCase() !== "hash") {
                  return (
                    <th
                      key={key}
                      className={
                        deletedCols.includes(key) ? "deleted-column" : ""
                      }
                    >
                      {key.toUpperCase()}
                    </th>
                  );
                }
              })}
              {newColumns.map((key) => (
                <th className="new-columns" key={key}>
                  {key.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(newData).map((rowIndx) => (
              <React.Fragment key={rowIndx}>
                <tr>
                  {oldColumns.map((col, idx) => {
                    if (col.toLowerCase() !== "hash") {
                      return (
                        <td key={idx}>
                          {newData[rowIndx][col] !== undefined &&
                          newData[rowIndx][col] != -1
                            ? newData[rowIndx][col]
                            : ""}
                        </td>
                      );
                    }
                  })}
                  {newColumns.map((col, idx) => {
                    if (col.toLowerCase() !== "hash") {
                      return (
                        <td className="new-column-values" key={idx}>
                          {newData[rowIndx][col] !== undefined &&
                          newData[rowIndx][col] != -1
                            ? newData[rowIndx][col]
                            : ""}
                        </td>
                      );
                    }
                  })}
                </tr>
                {updatedRows[rowIndx] && (
                  <tr>
                    {allColumns.map((col, index) => {
                      // console.log(allColumns);
                      if (col.toLowerCase() !== "hash") {
                        // console.log(rowIndx, col, updatedRows[rowIndx][col]);
                        return (
                          <td className="new-row-values" key={index}>
                            {updatedRows[rowIndx][col] !== undefined &&
                            updatedRows[rowIndx][col] != -1
                              ? updatedRows[rowIndx][col]
                              : ""}
                          </td>
                        );
                      }
                    })}
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {Object.keys(deletedRows).length > 0 && (
        <div className="deteted-row-table">
          <h2 className="table-heads">DELETED ROWS</h2>
          <SubTable tableType="delete" data={deletedRows} />
        </div>
      )}
      {Object.keys(newRows).length > 0 && (
        <div className="New-row-table">
          <h2 className="table-heads">ADDED ROWS</h2>
          <SubTable tableType="New" data={newRows} />
        </div>
      )}
    </section>
  );
};
export default Table;
