// src/Table.js
import React, { useState, useEffect } from "react";
// import { columnChanges } from "./columnChanges";
import "./table.css";
import { cellChanges, columnChanges, tableChanges } from "../../lib/mockData";
import { useLocation } from "react-router-dom";
import SubTable from "../../components/subTable/subTable";
import { Operations } from "../../lib/enum";
import { CompareFile } from "../../api/api";
// import { cellChanges, columnChanges } from "../../lib/mockData";

const Table = () => {
  // const Table = ({ data }) => {
  const location = useLocation();

  const { data, tableName } = location.state || {};
  console.log(tableName);

  const [oldColumns, setOldColumns] = useState(
    Object.keys(Object.values(data)[0] || {})
  );
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

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0]; // Get the first uploaded file
    setFile(uploadedFile);
  };

  // let deletedCols = [];

  useEffect(() => {
    const deleteHashes = tableChanges
      ? tableChanges
          .filter(
            (entry) =>
              entry.type === "ROW" && entry.operation === Operations.DELETE
          )
          .flatMap((entry) => Object.keys(JSON.parse(entry.values)))
      : [];

    const newCols = tableChanges
      ? tableChanges
          .filter(
            (change) =>
              change.type === "COLUMN" && change.operation === Operations.ADD
          )
          .flatMap((change) => {
            // console.log(Object.keys(JSON.parse(change.values)));
            return Object.keys(JSON.parse(change.values));
          })
      : [];
    const deleteCols = tableChanges
      ? tableChanges
          .filter(
            (change) =>
              change.type === "COLUMN" && change.operation === Operations.DELETE
          )
          .flatMap((change) => {
            // console.log(Object.keys(JSON.parse(change.values)));
            return Object.keys(JSON.parse(change.values));
          })
      : [];

    // console.log(newCols);
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

    console.log(cellChanges);

    cellChanges?.forEach((cellChange) => {
      const { id, type, row_name, column_name, new_value } = cellChange;
      const rowIndex = row_name; // assuming row_name is 1-based index
      console.log(new_value);
      console.log(updatedRowData);
      if (newData[rowIndex]) {
        if (type == Operations.UPDATE) {
          if (newCols.includes(column_name)) {
            console.log("yo1");
            newData[rowIndex][column_name] = new_value;
          } else {
            console.log("yo2", rowIndex, column_name, new_value);

            console.log(updatedRowData);
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

    console.log("updates rows", updatedRowData);

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
    setAllColumns(columns);
    setNewData(newData);
    setUpdatedRows(updatedRowData);
    setNewRows(newRowData);
    setDeletedRows(deletedRowsData);

    console.log("columns", columns);
    console.log("columns", columns);
    console.log("columns", columns);
  }, [cellChanges, tableChanges]);

  const handleCompare = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file to upload."); // Use alert for feedback
      return;
    }

    const formData = new FormData();
    formData.append("cmp_file", file); // Append the selected file
    // console.log("file....", file);
    // console.log("formdata....", formData);
    try {
      const res = await CompareFile(formData, tableName);
      setCellChanges(res?.data.cell_changes);
      setTableChanges(res?.data.table_changes);
      console.log("cell Chnages", cellChanges);
      console.log("Table changes", tableChanges);
    } catch (error) {
      console.error(error);
      alert("An error occurred while uploading the file."); // Use alert for feedback
    }
  };

  console.log(deletedRows);
  if (deletedCols) {
    console.log("yooo");
  }
  async function handleDownload()
  {
    await DownloadFile(tableName)
  }

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
                      if (col.toLowerCase() !== "hash") {
                        return (
                          <td className="new-row-values" key={index}>
                            {updatedRows[rowIndx][col] !== undefined &&
                            updatedRows[rowIndx][col] !== -1
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
