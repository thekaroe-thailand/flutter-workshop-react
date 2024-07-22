import React from "react";
import ReactDOM from "react-dom/client";
import SignIn from "./SignIn";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Room from "./Room";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/room",
    element: <Room />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
