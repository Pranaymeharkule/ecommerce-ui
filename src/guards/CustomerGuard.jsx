import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CustomerGuard({ children }) {

 const { user, loading } = useAuth();

 // Wait for auth before deciding
 if (loading) return null;

 if (!user) return <Navigate to="/login" />;

 return children;
}