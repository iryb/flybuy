import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/home/Home";
import { ApiPath } from "./common/enums/apiPath";
import { Product } from "@/pages/product/Product";
import { Checkout } from "@/pages/checkout/Checkout";
import { PaymentSuccessfull } from "@/pages/checkout/PaymentSuccessfull";

import "@styles/global.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: ApiPath.PRODUCT,
        element: <Product />,
      },
      {
        path: ApiPath.CHECKOUT,
        element: <Checkout />,
      },
      {
        path: ApiPath.PAYMENTSUCCESSFULL,
        element: <PaymentSuccessfull />,
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
