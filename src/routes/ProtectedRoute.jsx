import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, admin }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (admin && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}