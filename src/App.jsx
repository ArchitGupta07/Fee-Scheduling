// src/index.jsx
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Table from "./routes/table/table";
import Dashboard from "./routes/dashboard/dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/table",
      element: <Table />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
