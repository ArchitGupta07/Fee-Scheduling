import { getFiles } from "./src/api/api.js";

// console.log(await getFiles("new york", "dental"))
const timestamp = '2024-08-14T05:26:56.007781';

// Create a Date object from the timestamp
const dateObject = new Date(timestamp);

// Extract the date in YYYY-MM-DD format
const dateString = dateObject.toISOString().split('T')[0];

console.log(dateString); // Output: '2024-08-14'
