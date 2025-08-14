import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface profileForm {
  _id?: string;
  user?: string;
  company?: string;
  website?: string;
  location?: string;
  bio?: string;
  status?: string;
  githubusername?: string;
  skills?: string;
  socials?: {
    youtube?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
}

const CreateProfile = () => {
  const [formData, setFormData] = useState<profileForm>({
    company: "",
    website: "",
    location: "",
    bio: "",
    status: "",
    githubusername: "",
    skills: "",
    socials: {
      youtube: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      instagram: "",
    },
  });
  const [toggleSocial, setToggleSocial] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/profile/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Success");
    return res.data;
  };

  const { data: profile } = useQuery<profileForm, Error>({
    queryKey: ["userProfile"],
    queryFn: getProfile,
  });

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    socials,
  } = formData;
  const cleanedSocials = Object.fromEntries(
    Object.entries(socials || {}).filter(([, v]) => v?.trim() !== "")
  );

  const body: profileForm = {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    socials: cleanedSocials,
  };

  const payload = {
    ...body,
    skills: body?.skills?.split(",").map((skill) => skill.trim()) || [],
  };

  const postProfile = async (body: profileForm) => {
    const res = await axios.post("/profile", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: postProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      navigate("/dashboard");
      toast.success("Profile Saved Successfully!");
    },
    onError: (err) => {
      toast.error("Failed to save Profile!");
      console.log(err);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (
      ["twitter", "facebook", "youtube", "linkedin", "instagram"].includes(name)
    ) {
      setFormData((prev) => ({
        ...prev,
        socials: {
          ...prev.socials,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Sending the request", body);
    mutate(body);
  };
  return (
    <>
      <section className="container">
        <h1 className="large text-primary">
          {profile ? "Edit" : "Create"} Your Profile
        </h1>
        <p className="lead">
          <i className="fas fa-user"></i>{" "}
          {profile
            ? "Let's Edit your Profile to the Next Level!"
            : "Let's get some information to make your profile stand out"}
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <select
              name="status"
              onChange={handleStatus}
              value={formData.status}
            >
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Company"
              name="company"
              onChange={handleChange}
              value={formData.company}
            />
            <small className="form-text">
              Could be your own company or one you work for
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Website"
              name="website"
              onChange={handleChange}
              value={formData.website}
            />
            <small className="form-text">
              Could be your own or a company website
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              onChange={handleChange}
              value={formData.location}
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Skills"
              name="skills"
              onChange={handleChange}
              value={formData.skills}
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              name="githubusername"
              onChange={handleChange}
              value={formData.githubusername}
            />
            <small className="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              onChange={handleTextArea}
              value={formData.bio}
            ></textarea>
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="my-2">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setToggleSocial(!toggleSocial)}
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>
          {toggleSocial && (
            <>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  onChange={handleChange}
                  value={formData.socials?.twitter}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  onChange={handleChange}
                  value={formData.socials?.facebook}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  onChange={handleChange}
                  value={formData.socials?.youtube}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  onChange={handleChange}
                  value={formData.socials?.linkedin}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  onChange={handleChange}
                  value={formData.socials?.instagram}
                />
              </div>
            </>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary my-1"
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
          <a className="btn btn-light my-1" href="dashboard.html">
            Go Back
          </a>
        </form>
      </section>
    </>
  );
};

export default CreateProfile;
