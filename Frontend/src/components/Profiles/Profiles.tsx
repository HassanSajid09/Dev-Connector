import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axios";
import ProfileItem from "./ProfileItem";
import NavBar from "../Layout/NavBar";

const Profiles = () => {
  const getAllProfiles = async () => {
    const res = await axios.get("/profile");
    return res.data;
  };

  const { data: profiles, isPending } = useQuery({
    queryKey: ["Profiles"],
    queryFn: getAllProfiles,
  });

  return (
    <>
      <NavBar />
      <section className="container">
        {isPending ? (
          <p>Loading Profiles...</p>
        ) : (
          <>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
              <i className="fab fa-connectdevelop"></i> Browse and Connect with
              Developers
            </p>
            <div className="profiles">
              {profiles.length > 0 ? (
                <>
                  {profiles.map((profile) => (
                    <ProfileItem key={profile._id} profile={profile} />
                  ))}
                </>
              ) : (
                <h4>No Profile Found!</h4>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Profiles;
