const BASE_URL = 'https://fee-scheduling-be-architgupta07-architgupta07s-projects.vercel.app';
// const BASE_URL = 'http://127.0.0.1:8000';


export async function UploadFile(formData) {
    const response = await fetch(`${BASE_URL}${"/files/upload"}`, {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        const res = await response.json();
        // console.log("response...........", res.data);
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

export async function getFileData(tableName) {

    try {
        const response = await fetch(`${BASE_URL}/files/file-data/${tableName}`, {
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
    // {
    //     "data": [
    //       {
    //         "table_name": "demo7_20240809_172209",
    //         "file_name": "Demo7.xlsx"
    //       },
    //       {
    //         "table_name": "demo100_20240810_224735",
    //         "file_name": "demo100.xlsx"
    //       },
    //       {
    //         "table_name": "demo100_20240810_225229",
    //         "file_name": "demo100.xlsx"
    //       }
    //     ]
    //   }


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