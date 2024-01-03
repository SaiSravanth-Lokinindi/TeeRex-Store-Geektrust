import React from "react";
import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";

import Products from "./routes/Products";
import Cart from "./routes/Cart";

import "./App.css";
import RootLayout from "./routes/RootLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: (
        <h1>
          Something went wrong, try again later or{" "}
          <Link to="/">
            <i>navigate to home.</i>
          </Link>
        </h1>
      ),
      children: [
        {
          path: "/",
          element: <Products />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
