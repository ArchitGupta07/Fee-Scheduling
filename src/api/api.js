const BASE_URL = 'https://fee-scheduling-be.vercel.app';
// const BASE_URL = 'http://127.0.0.1:8000';



export async function getFiles(statename = "new york", category = "dental") {
    const url = new URL(`${BASE_URL}/files/`);
    url.searchParams.append('statename', statename);
    url.searchParams.append('category', category);



    try {
        const response = await fetch(url, {
            method: "GET",
        });

        if (response.ok) {
            const res = await response.json();
            return res.data;
        } else {
            alert("Failed to fetch uploaded files.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching uploaded files:", error);
        alert("An error occurred while fetching files.");
        return null;
    }
}




export async function UploadFile(formData) {


    console.log(formData)
    const response = await fetch(`${BASE_URL}${"/files/upload"}`, {
        method: "POST",
        body: formData,
    });



    if (response.ok) {
        const res = await response.json();
        console.log("response...........", res.data);
        return res

    } else {
        alert("File upload failed."); // Use alert for feedback
        return null
    }
}


export async function CompareFile(formData, tableName) {

    console.log(formData)
    const response = await fetch(`${BASE_URL}/files/compare/${tableName}`, {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        const res = await response.json();
        // console.log("response...........", res.data);
        return res

    } else {
        alert("File comparison failed."); // Use alert for feedback
        return null
    }
}

export async function getFileData(tableName, id) {

    try {
        const response = await fetch(`${BASE_URL}/files/file-data/${tableName}/${id}`, {
            method: "GET",
        });

        if (response.ok) {
            const res = await response.json();
            return res;
        } else {
            alert("Failed to fetch file data.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching file data:", error);
        alert("An error occurred while fetching file data.");
        return null;
    }
}
export async function getMyFiles() {
    try {
        const response = await fetch(`${BASE_URL}/files`, {
            method: "GET",
        });

        if (response.ok) {
            const res = await response.json();
            return res.data;
        } else {
            alert("Failed to fetch uploaded files.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching uploaded files:", error);
        alert("An error occurred while fetching files.");
        return null;
    }
}
export async function getNewChanges(id) {
    try {
        const response = await fetch(`${BASE_URL}/files/get_cell_changes/${id}`, {
            method: "GET",
        });

        if (response.ok) {
            const res = await response.json();
            // console.log(res.data)
            return res;
        } else {
            alert("Failed to fetch cell changes.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching cell changes:", error);
        alert("An error occurred while fetching cell changes.");
        return null;
    }
}

export async function DownloadFile(table_name) {
    const response = await fetch(`${BASE_URL}/files/download/${table_name}`, {
        method: "GET",
    });
    console.log("down")

    if (response.ok) {
        const blob = await response.blob();

        // Create a URL for the blob and trigger the download
        const urlObject = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = urlObject;
        link.setAttribute('download', `${table_name}.xlsx`); // Filename for the downloaded file
        document.body.appendChild(link);
        link.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(urlObject);
        // console.log("response...........", res.data);

    } else {
        alert("File upload failed."); // Use alert for feedback
        return null
    }
}



// export async function applyFileChanges(tableName, data) {
//     try {
//         const response = await fetch(`${BASE_URL}/files/update/${tableName}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             alert(`Success: ${data.message}`);
//         } else {
//             const errorData = await response.json();
//             alert(`Error: ${errorData.detail}`);
//         }
//     } catch (error) {
//         console.error("Error updating item:", error);
//     }
// };
export async function getActiveTableCols(tableName) {
    try {
        const response = await fetch(`${BASE_URL}/files/update/${tableName}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const data = await response.json();
            alert(`Success: ${data.message}`);
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.detail}`);
        }
    } catch (error) {
        console.error("Error updating item:", error);
    }
};



export async function applyFileChanges(tableName, newColumns, deletedCols) {
    const data = {
        newColumns: newColumns,
        deletedCols: deletedCols
    };

    try {
        const response = await fetch(`${BASE_URL}/files/update/${tableName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            alert(`Success: ${result.message}`);
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.detail}`);
        }
    } catch (error) {
        console.error("Error updating item:", error);
    }

};
