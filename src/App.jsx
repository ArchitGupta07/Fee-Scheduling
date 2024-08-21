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
import States from "./routes/states/states";
import Categories from "./routes/categories/categories";
import Fee from "./routes/fee/fee";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <States />,
    },
    {
      path: "/states",
      element: <States />,
    },
    {
      path: "/states/:stateName",
      element: <Categories />,
    },
    {
      path: "/fee/:stateName/:category",
      element: <Fee />,
    },
    {
      path: "/table/:tableName",
      element: <Table />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
