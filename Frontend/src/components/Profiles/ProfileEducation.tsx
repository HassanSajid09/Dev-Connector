import FormatDate from "../../utils/FormatDate";

const ProfileEducation = ({
  education: { institute, degree, fieldofstudy, from, to, description },
}) => {
  return (
    <>
      <div className="profile-edu bg-white p-2">
        <h2 className="text-primary">Education</h2>
        <div>
          <h3 className="text-dark">{institute}</h3>
          <p>
            {FormatDate(from)} - {to ? FormatDate(to) : "Now"}
          </p>
          <p>
            <strong>Degree: </strong>
            {degree}
          </p>
          <p>
            <strong>Field of Study: </strong> {fieldofstudy}
          </p>
          <p>
            <strong>Description: </strong> {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileEducation;
