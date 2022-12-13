import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

function App(): React.ReactElement {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
