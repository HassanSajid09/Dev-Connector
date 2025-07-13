import { Navigate, Outlet } from "react-router-dom";

const PrvRoute = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrvRoute;
