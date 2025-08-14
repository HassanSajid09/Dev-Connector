import type { profileItem } from "../Types/types";


const ProfileTop = ({ profile }:{profile:profileItem}) => {
  return (
    <>
      <div className="profile-top bg-primary p-2">
        <img src={profile?.user?.avatar} alt="" className="round-img my-1" />
        <h1 className="large">{profile?.user?.name}</h1>
        <p className="lead">
          {profile?.status}{" "}
          {profile?.company && <span> at {profile?.company}</span>}
        </p>
        <p>{profile?.location}</p>
        <div className="icons my-1">
          {profile?.website && (
            <a href={profile.website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>
            </a>
          )}
          {profile?.socials?.twitter && (
            <a
              href={profile?.socials?.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          )}
          {profile?.socials?.facebook && (
            <a
              href={profile?.socials?.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook fa-2x"></i>
            </a>
          )}
          {profile?.socials?.linkedin && (
            <a
              href={profile?.socials?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          )}
          {profile?.socials?.youtube && (
            <a
              href={profile?.socials?.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube fa-2x"></i>
            </a>
          )}
          {profile?.socials?.instagram && (
            <a
              href={profile?.socials?.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileTop;
