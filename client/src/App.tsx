import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@components/layout/Layout";
import { Home } from "@pages/home/Home";
import { ApiPath } from "@enums/apiPath";
import { Product } from "@pages/product/Product";
import { Checkout } from "@pages/checkout/Checkout";
import { PaymentSuccessfull } from "@pages/checkout/PaymentSuccessfull";
import { Category } from "@pages/category/Category";
import { SignIn } from "@pages/sign/SignIn";
import { SignUp } from "@pages/sign/SignUp";
import { Profile } from "@pages/profile/Profile";
import { Search } from "@pages/search/Search";
import { PrivateRoute } from "@components/privateRoute/PrivateRoute";
import { ForgotPassword } from "@pages/forgotPassword/ForgotPassword";
import { ResetPassword } from "@pages/resetPassword/ResetPassword";
import { NotFound } from "@pages/notFound/NotFound";
import { About } from "@pages/about/About";
import { Contact } from "@pages/contact/Contact";

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
        element: <PrivateRoute />,
        children: [
          {
            path: ApiPath.PROFILE,
            element: <Profile />,
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
      {
        path: ApiPath.SIGNIN,
        element: <SignIn />,
      },
      {
        path: ApiPath.SIGNUP,
        element: <SignUp />,
      },
      {
        path: ApiPath.FORGOTPASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: ApiPath.RESETPASSWORD,
        element: <ResetPassword />,
      },
      {
        path: ApiPath.SEARCH,
        element: <Search />,
      },
      {
        path: ApiPath.ABOUT,
        element: <About />,
      },
      {
        path: ApiPath.CONTACT,
        element: <Contact />,
      },
      {
        path: "*",
        element: <NotFound />,
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
