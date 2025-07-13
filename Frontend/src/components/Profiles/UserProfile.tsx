import { NavLink } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import ProfileTop from "./ProfileTop";
import Profileabout from "./Profileabout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGitHub from "./ProfileGitHub";
import { useCustom } from "../Hooks/useCustom";

const UserProfile = () => {
  const { profile, isMyProfile, isPending } = useCustom();

  return (
    <>
      {isPending && <p>Loading Profile...</p>}
      <NavBar />
      <section className="container">
        <NavLink className="btn btn-light" to="/profiles">
          Back To Profiles
        </NavLink>
        {isMyProfile && (
          <NavLink className="btn btn-dark" to="/create-profile">
            {" "}
            Edit Profile
          </NavLink>
        )}
        <div className="profile-grid my-1">
          <ProfileTop profile={profile} />
          <Profileabout profile={profile} key={profile?._id} />
          {profile?.experience.length > 0 ? (
            <>
              {profile?.experience.map((experience) => (
                <ProfileExperience
                  key={experience._id}
                  experience={experience}
                />
              ))}
            </>
          ) : (
            <h4>No experience credentials</h4>
          )}
          {profile?.education.length > 0 ? (
            <>
              {profile?.education.map((education) => (
                <ProfileEducation key={education._id} education={education} />
              ))}
            </>
          ) : (
            <h4>No education credentials</h4>
          )}
          {profile?.githubusername && (
            <ProfileGitHub username={profile?.githubusername} />
          )}
        </div>
      </section>
    </>
  );
};

export default UserProfile;
