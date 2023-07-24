import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useUserContext } from "../src/components/UserContext";
import Dashboard from "../src/pages/Dashboard";

export default function RequireAuth({ allowedRoles }) {
  const { user } = useUserContext();
  const location = useLocation;

  function verifyUserRole() {
    if (user?.roles === "admin") {
      return (
        <>
          <Dashboard />
          <Outlet />
        </>
      );
    }
    return <Outlet />;
  }

  return user?.roles === allowedRoles ? (
    verifyUserRole()
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

RequireAuth.propTypes = {
  allowedRoles: PropTypes.string.isRequired,
};
