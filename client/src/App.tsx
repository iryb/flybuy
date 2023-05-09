import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/home/Home";
import { ApiPath } from "./common/enums/apiPath";
import { Product } from "@/pages/product/Product";
import { Checkout } from "@/pages/checkout/Checkout";
import { PaymentSuccessfull } from "@/pages/checkout/PaymentSuccessfull";
import { Category } from "@/pages/category/Category";
import { SignIn } from "@/pages/sign/SignIn";
import { SignUp } from "@/pages/sign/SignUp";

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
        path: ApiPath.CATEGORY,
        element: <Category />,
      },
      {
        path: ApiPath.CHECKOUT,
        element: <Checkout />,
      },
      {
        path: ApiPath.PAYMENTSUCCESSFULL,
        element: <PaymentSuccessfull />,
      },
      {
        path: ApiPath.SIGNIN,
        element: <SignIn />,
      },
      {
        path: ApiPath.SIGNUP,
        element: <SignUp />,
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
