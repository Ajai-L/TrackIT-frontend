import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import About from "./Pages/About";
import Notes from "./Pages/Notes";
import Tasks from "./Pages/Tasks";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import ProtectedRouter from "./Pages/Help";
// just to create url and on which url which page should displayed
const routerVariables = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProtectedRouter><Dashboard /></ProtectedRouter>,
      },
      {
        path: "/home",
        element: <ProtectedRouter><Home /></ProtectedRouter>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/notes",
        element: <ProtectedRouter><Notes /></ProtectedRouter>,
      },
      {
        path: "/tasks",
        element: <ProtectedRouter><Tasks /></ProtectedRouter>,
      },
      {
        path: "/about",
        element: <ProtectedRouter><About /></ProtectedRouter>,
      },
      {
        path: "/profile",
        element: <ProtectedRouter><Profile /></ProtectedRouter>,
      },
      {
        path: "*",
        element: <h1>Page not found Please check your URL</h1>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={routerVariables}></RouterProvider>
  </React.StrictMode>
);

reportWebVitals();