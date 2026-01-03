import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const loggedIn = localStorage.getItem("loggedIn");
  const userRole = localStorage.getItem("role");

  if (!loggedIn) {
    return <Navigate to="/" />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
