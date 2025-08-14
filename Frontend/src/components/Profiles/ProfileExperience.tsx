import FormatDate from "../../utils/FormatDate";
import type { Experience } from "../Types/types";

const ProfileExperience = ({ experience }: { experience: Experience }) => {
  return (
    <>
      <div className="profile-exp bg-white p-2">
        <h2 className="text-primary">Experience</h2>
        <div>
          <h3 className="text-dark">{experience.company}</h3>
          <p>
            {FormatDate(experience.from)} -{" "}
            {experience.to ? FormatDate(experience.to) : "Now"}
          </p>
          <p>
            <strong>Position: </strong>
            {experience.title}
          </p>
          <p>
            <strong>Location: </strong> {experience.location}
          </p>
          <p>
            <strong>Description: </strong> {experience.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileExperience;
