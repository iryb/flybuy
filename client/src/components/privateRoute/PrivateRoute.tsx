import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ApiPath } from "@/common/enums/apiPath";
import { getToken } from "@/helpers/helpers";

export const PrivateRoute = (): React.ReactElement => {
  const isAuthenticated = getToken();

  return isAuthenticated ? <Outlet /> : <Navigate to={ApiPath.SIGNIN} />;
};
