interface Profile {
  user: {
    name: string;
  };
  bio: string;
  skills: string[];
}

const Profileabout = ({ profile }: { profile: Profile }) => {
  return (
    <>
      <div className="profile-about bg-light p-2">
        <h2 className="text-primary">
          {profile?.user?.name?.split(" ")[0]}'s Bio
        </h2>
        <p>{profile?.bio}</p>
        <div className="line"></div>
        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">
          {profile?.skills.slice(0, 4).map((skill: string, index: number) => (
            <>
              <div key={index} className="p-1">
                <i className="fa fa-check"></i> {skill}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profileabout;
