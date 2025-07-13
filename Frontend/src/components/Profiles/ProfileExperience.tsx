import FormatDate from "../../utils/FormatDate";

const ProfileExperience = ({
  experience: { title, location, company, from, to, description },
}) => {
  return (
    <>
      <div className="profile-exp bg-white p-2">
        <h2 className="text-primary">Experience</h2>
        <div>
          <h3 className="text-dark">{company}</h3>
          <p>
            {FormatDate(from)} - {to ? FormatDate(to) : "Now"}
          </p>
          <p>
            <strong>Position: </strong>
            {title}
          </p>
          <p>
            <strong>Location: </strong> {location}
          </p>
          <p>
            <strong>Description: </strong> {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileExperience;
