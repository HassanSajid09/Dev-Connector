import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import NavBar from "../Layout/NavBar";
import Experience from "./Experience";
import Education from "./Education";
import toast from "react-hot-toast";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getProfile = async () => {
    const res = await axios.get("/profile/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const { data: profile, isPending } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getProfile,
    retry: false,
  });

  const deleteAccount = async () => {
    const confirmed = confirm(
      "⚠️ Are you sure? This will delete your profile and account permanently!"
    );
    if (!confirmed) return;
    try {
      await axios.delete("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      queryClient.removeQueries();
      navigate("/");
      toast.success("Account Deleted Successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to Delete Account!");
    }
  };

  if (isPending) return <p>Loading Dashboard...</p>;
  return (
    <>
      <NavBar />
      <section className="container">
        <h1 className="large text-primary">Dashboard</h1>
        {profile ? (
          <>
            <p className="lead">
              <i className="fas fa-user"></i> Welcome {profile?.user?.name}
            </p>
            <div className="dash-buttons">
              <NavLink to="/create-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-primary"></i> Edit Profile
              </NavLink>
              <NavLink to="/add-experience" className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i> Add Experience
              </NavLink>
              <NavLink to="/add-education" className="btn btn-light">
                <i className="fas fa-graduation-cap text-primary"></i> Add
                Education
              </NavLink>
            </div>
            <Experience experience={profile?.experience} />
            <Education education={profile?.education} />
            <div className="my-2">
              <button className="btn btn-danger" onClick={deleteAccount}>
                <i className="fas fa-user-minus"></i>
                Delete My Account
              </button>
            </div>
          </>
        ) : (
          <>
            <p>No Profile Found Create One Now!</p>
            <NavLink to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </NavLink>
          </>
        )}
      </section>
    </>
  );
};

export default Dashboard;
