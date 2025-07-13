import { Navigate, Outlet } from "react-router-dom";

const PubRoute = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  return !isLoggedIn ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PubRoute;
