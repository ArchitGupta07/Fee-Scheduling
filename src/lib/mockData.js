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

