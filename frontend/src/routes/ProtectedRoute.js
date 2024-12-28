import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token || !role) {
    return <Navigate to="/login" />;
  }
  return <MainLayout />;
};

export default ProtectedRoute;
