import React from "react";
import Table from "./components/Table/Table";
// import Table from "./Table";

const App = () => {
  const users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
  ];

  return (
    <div className="App">
      <h1>User List</h1>
      <Table data={users} />
    </div>
  );
};

export default App;
