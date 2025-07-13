import { NavLink } from "react-router-dom";

const ProfileItem = ({
  profile: { status, company, location, skills, user },
}) => {
  return (
    <>
      <div className="profiles">
        <div className="profile bg-light">
          <img src={user?.avatar} alt="" className="round-img" />
          <div>
            <h2>{user?.name}</h2>
            <p>
              {status} {company && <span>at {company}</span>}
            </p>
            <p className="my-1">{location && <span>{location}</span>}</p>
            <NavLink to={`/profile/${user._id}`} className="btn btn-primary">
              {" "}
              View Profile
            </NavLink>
          </div>
          <ul>
            {skills.slice(0, 4).map((skill, index) => (
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
