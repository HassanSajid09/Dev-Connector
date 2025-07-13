import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axios";

const ProfileGitHub = ({ username }) => {
  const getGithubRepos = async () => {
    const res = await axios.get(`/profile/github/${username}`);
    return res.data;
  };

  const { data: repos } = useQuery({
    queryKey: ["repos"],
    queryFn: getGithubRepos,
  });
  return (
    <>
      <div className="profile-github">
        <h2 className="text-primary my-1">GitHub Repos</h2>
        {repos?.map((repo) => (
          <div key={repo.id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileGitHub;
