import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import jwtDecode from "jwt-decode";

const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    const role = decoded?.role;

    if (location.pathname.startsWith("/admin") && role !== "ADMIN") {
      return <Navigate to="/user" />;
    }

    if (location.pathname.startsWith("/user") && role !== "USER") {
      return <Navigate to="/admin" />;
    }


    return <Outlet />;
  } catch (error) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;