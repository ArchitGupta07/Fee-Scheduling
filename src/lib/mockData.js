export const cellChanges = [
    {
        "id": 1,
        "comparison_id": "550e8400-e29b-41d4-a716-446655440001",
        "type": "INSERT",
        "row_name": 1,
        "column_name": "Age",
        "old_value": null,
        "new_value": 28
    },
    {
        "id": 1,
        "comparison_id": "550e8400-e29b-41d4-a716-446655440001",
        "type": "INSERT",
        "row_name": 1,
        "column_name": "name",
        "old_value": "John Doe",
        "new_value": "Archit Gupta"
    },

    {
        "id": 2,
        "comparison_id": "550e8400-e29b-41d4-a716-446655440002",
        "type": "INSERT",
        "row_name": 2,
        "column_name": "Age",
        "old_value": null,
        "new_value": 33
    },
    {
        "id": 3,
        "comparison_id": "550e8400-e29b-41d4-a716-446655440000",
        "type": "INSERT",
        "row_name": 3,
        "column_name": "Age",
        "old_value": null,
        "new_value": 22
    }
]

export const columnChanges = [
    {
        "id": 1,
        "comparison_id": "550e8400-e29b-41d4-a716-446655440000",
        "type": "ADD",
        "columns": ["Age", "Phno"]

    },
    {
        "id": 2,
        "comparison_id": "550e8400-e29b-41d4-a716-446655440000",
        "type": "REMOVE",
        "columns": ["OldColumn1"]

    }
]


export const tableChanges = [
    {
        "type": "COLUMN",
        "operation": "ADD",
        "values": { "age": "int", "phn": "varhcar" }
    },
    {
        "type": "ROW",
        "operation": "DELETE",
        "values": { "4731055301": 1, "4731055302": 1 }
    }
]


export const US_States = [
    { "state": "Alabama", "abbreviation": "AL", "population": 4921532 },
    { "state": "Alaska", "abbreviation": "AK", "population": 731158 },
    { "state": "Arizona", "abbreviation": "AZ", "population": 7421401 },
    { "state": "Arkansas", "abbreviation": "AR", "population": 3030522 },
    { "state": "California", "abbreviation": "CA", "population": 39368078 },
    { "state": "Colorado", "abbreviation": "CO", "population": 5758736 },
    { "state": "Connecticut", "abbreviation": "CT", "population": 3552825 },
    { "state": "Delaware", "abbreviation": "DE", "population": 973764 },
    { "state": "Florida", "abbreviation": "FL", "population": 21733312 },
    { "state": "Georgia", "abbreviation": "GA", "population": 10710017 },
    { "state": "Hawaii", "abbreviation": "HI", "population": 1421134 },
    { "state": "Idaho", "abbreviation": "ID", "population": 1839106 },
    { "state": "Illinois", "abbreviation": "IL", "population": 12671469 },
    { "state": "Indiana", "abbreviation": "IN", "population": 6785528 },
    { "state": "Iowa", "abbreviation": "IA", "population": 3193079 },
    { "state": "Kansas", "abbreviation": "KS", "population": 2934582 },
    { "state": "Kentucky", "abbreviation": "KY", "population": 4477265 },
    { "state": "Louisiana", "abbreviation": "LA", "population": 4627004 },
    { "state": "Maine", "abbreviation": "ME", "population": 1350141 },
    { "state": "Maryland", "abbreviation": "MD", "population": 6165129 },
    { "state": "Massachusetts", "abbreviation": "MA", "population": 6976597 },
    { "state": "Michigan", "abbreviation": "MI", "population": 9989642 },
    { "state": "Minnesota", "abbreviation": "MN", "population": 5700671 },
    { "state": "Mississippi", "abbreviation": "MS", "population": 2966786 },
    { "state": "Missouri", "abbreviation": "MO", "population": 6154913 },
    { "state": "Montana", "abbreviation": "MT", "population": 1084225 },
    { "state": "Nebraska", "abbreviation": "NE", "population": 1961504 },
    { "state": "Nevada", "abbreviation": "NV", "population": 3138259 },
    { "state": "New Hampshire", "abbreviation": "NH", "population": 1377529 },
    { "state": "New Jersey", "abbreviation": "NJ", "population": 9267130 },
    { "state": "New Mexico", "abbreviation": "NM", "population": 2117522 },
    { "state": "New York", "abbreviation": "NY", "population": 20215751 },
    { "state": "North Carolina", "abbreviation": "NC", "population": 10600823 },
    { "state": "North Dakota", "abbreviation": "ND", "population": 779702 },
    { "state": "Ohio", "abbreviation": "OH", "population": 11747694 },
    { "state": "Oklahoma", "abbreviation": "OK", "population": 3963516 },
    { "state": "Oregon", "abbreviation": "OR", "population": 4318492 },
    { "state": "Pennsylvania", "abbreviation": "PA", "population": 12803056 },
    { "state": "Rhode Island", "abbreviation": "RI", "population": 1059361 },
    { "state": "South Carolina", "abbreviation": "SC", "population": 5277830 },
    { "state": "South Dakota", "abbreviation": "SD", "population": 896581 },
    { "state": "Tennessee", "abbreviation": "TN", "population": 6916897 },
    { "state": "Texas", "abbreviation": "TX", "population": 29945357 },
    { "state": "Utah", "abbreviation": "UT", "population": 3367718 },
    { "state": "Vermont", "abbreviation": "VT", "population": 643077 },
    { "state": "Virginia", "abbreviation": "VA", "population": 8745500 },
    { "state": "Washington", "abbreviation": "WA", "population": 7770483 },
    { "state": "West Virginia", "abbreviation": "WV", "population": 1782954 },
    { "state": "Wisconsin", "abbreviation": "WI", "population": 5854172 },
    { "state": "Wyoming", "abbreviation": "WY", "population": 559678 }
]


export const stateInsuranceCoverage = {
    "California": ["Cardiology", "Gastroenterology", "Rheumatology", "Pulmonology"],
    "Texas": ["Cardiology", "Nephrology", "Endocrinology"],
    "Florida": ["Cardiology", "Immunology", "Pulmonology"],
    "New York": ["Cardiology", "Ophthalmology", "Oncology"],
    "Illinois": ["Cardiology", "Hematology", "Orthopedics"],
    "Arizona": ["Dermatology", "Rheumatology"],
    "Nevada": ["Dermatology", "Rheumatology"],
    "New Mexico": ["Dermatology"],
    "Colorado": ["Dermatology", "Pulmonology"],
    "Utah": ["Dermatology", "Pulmonology", "Rheumatology"],
    "Georgia": ["Pediatrics", "Immunology"],
    "North Carolina": ["Pediatrics"],
    "South Carolina": ["Pediatrics"],
    "Alabama": ["Pediatrics", "Immunology", "Endocrinology"],
    "Tennessee": ["Pediatrics", "Neurology"],
    "Ohio": ["Orthopedics", "Hematology"],
    "Michigan": ["Orthopedics", "Hematology"],
    "Pennsylvania": ["Orthopedics", "Ophthalmology"],
    "Indiana": ["Orthopedics"],
    "Kentucky": ["Orthopedics", "Neurology"],
    "Washington": ["Gastroenterology"],
    "Oregon": ["Gastroenterology", "Rheumatology"],
    "Alaska": ["Gastroenterology"],
    "Hawaii": ["Gastroenterology"],
    "Massachusetts": ["Oncology"],
    "Connecticut": ["Oncology"],
    "Rhode Island": ["Oncology"],
    "New Jersey": ["Oncology", "Ophthalmology"],
    "Maryland": ["Oncology"],
    "Virginia": ["Neurology"],
    "West Virginia": ["Neurology"],
    "Minnesota": ["Psychiatry"],
    "Wisconsin": ["Psychiatry"],
    "Iowa": ["Psychiatry"],
    "Nebraska": ["Psychiatry"],
    "North Dakota": ["Psychiatry"],
    "Louisiana": ["Endocrinology", "Nephrology"],
    "Arkansas": ["Endocrinology", "Nephrology"],
    "Mississippi": ["Endocrinology", "Immunology"],
    "Oklahoma": ["Endocrinology", "Nephrology"],
    "Delaware": ["Ophthalmology"],
    "Wyoming": ["Pulmonology"],
    "Montana": ["Pulmonology"],
    "Idaho": ["Pulmonology"],
};

export const diseaseYearlyFiles = [
    { tableName: "diabetes_2019", fileName: "diabetes_data_2019.xlsx" },
    { tableName: "diabetes_2020", fileName: "diabetes_data_2020.xlsx" },
    { tableName: "diabetes_2021", fileName: "diabetes_data_2021.xlsx" },
    { tableName: "diabetes_2022", fileName: "diabetes_data_2022.xlsx" },
    { tableName: "diabetes_2023", fileName: "diabetes_data_2023.xlsx" },
    { tableName: "diabetes_2018", fileName: "diabetes_data_2018.xlsx" },
    { tableName: "diabetes_2017", fileName: "diabetes_data_2017.xlsx" },
    { tableName: "diabetes_2016", fileName: "diabetes_data_2016.xlsx" },
    { tableName: "diabetes_2015", fileName: "diabetes_data_2015.xlsx" },
    { tableName: "diabetes_2014", fileName: "diabetes_data_2014.xlsx" },
];
