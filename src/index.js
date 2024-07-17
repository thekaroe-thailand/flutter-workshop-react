import React from 'react';
import ReactDOM from 'react-dom/client';
import SignIn from './SignIn';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: '/home',
    element: <Home />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
