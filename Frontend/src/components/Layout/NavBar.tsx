import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogOut = () => {
    const isConfirmed = confirm("Log Out?");
    if (isConfirmed) {
      localStorage.removeItem("token");
      toast.success("Logged Out Successfully!");
      queryClient.clear();
      navigate("/");
      // window.location.reload();
    }
  };
  return (
    <>
      <nav className="navbar bg-dark">
        {token ? (
          <>
            <h1>
              <NavLink to="/dashboard">
                <i className="fas fa-code"></i> DevConnector
              </NavLink>
            </h1>
            <ul>
              <li>
                <NavLink to="/dashboard">
                  <i className="fas fa-user"></i> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/profiles">
                  <i className="fas fa-laptop-code"></i> Developers
                </NavLink>
              </li>
              <li>
                <NavLink to="/posts">
                  <i className="fas fa-file-alt"></i> Posts
                </NavLink>
              </li>
              <li>
                <NavLink to="/" onClick={handleLogOut}>
                  <i className="fa-solid fa-right-from-bracket"></i> LogOut
                </NavLink>
              </li>
            </ul>
          </>
        ) : (
          <>
            <h1>
              <NavLink to="/">
                <i className="fas fa-code"></i> DevConnector
              </NavLink>
            </h1>
            <ul>
              <li>
                <NavLink to="/profiles">Developers</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
          </>
        )}
      </nav>
    </>
  );
};

export default NavBar;
