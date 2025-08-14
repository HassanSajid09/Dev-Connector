import FormatDate from "../../utils/FormatDate";
import type { Education } from "../Types/types";

const ProfileEducation = ({ education }: { education: Education }) => {
  return (
    <>
      <div className="profile-edu bg-white p-2">
        <h2 className="text-primary">Education</h2>
        <div>
          <h3 className="text-dark">{education.institute}</h3>
          <p>
            {FormatDate(education.from)} -{" "}
            {education.to ? FormatDate(education.to) : "Now"}
          </p>
          <p>
            <strong>Degree: </strong>
            {education.degree}
          </p>
          <p>
            <strong>Field of Study: </strong> {education.fieldofstudy}
          </p>
          <p>
            <strong>Description: </strong> {education.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileEducation;
