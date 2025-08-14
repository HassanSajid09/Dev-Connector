import { NavLink } from "react-router-dom";
import type { profileItem } from "../Types/types";

const ProfileItem = ({ profile }: { profile: profileItem }) => {
  return (
    <>
      <div className="profiles">
        <div className="profile bg-light">
          <img src={profile.user?.avatar} alt="" className="round-img" />
          <div>
            <h2>{profile.user?.name}</h2>
            <p>
              {status} {profile.company && <span>at {profile.company}</span>}
            </p>
            <p className="my-1">
              {location && <span>{profile.location}</span>}
            </p>
            <NavLink
              to={`/profile/${profile.user._id}`}
              className="btn btn-primary"
            >
              {" "}
              View Profile
            </NavLink>
          </div>
          <ul>
            {profile.skills.slice(0, 4).map((skill, index) => (
              <>
                <li className="text-primary" key={index}>
                  <i className="fa fa-check"></i> {skill}
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileItem;
