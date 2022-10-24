import React from "react";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";

function AdminProtectedRoute() {
  const token = localStorage.getItem("adminToken");
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/admin/login" />;
  }
}

export default AdminProtectedRoute;
