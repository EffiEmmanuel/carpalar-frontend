import React from "react";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";

function DriverProtectedRoute() {
  const token = localStorage.getItem("driverToken");
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/driver/login" />;
  }
}

export default DriverProtectedRoute;
