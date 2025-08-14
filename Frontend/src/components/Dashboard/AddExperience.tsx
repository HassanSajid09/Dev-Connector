import { useState } from "react";
import axios from "../../api/axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface ExpForm {
  title: string;
  company: string;
  location?: string;
  from: string;
  to?: string;
  current?: boolean;
  description: string;
}

const AddExperience = () => {
  const [formData, setFormData] = useState<ExpForm>({
    title: "",
    company: "",
    location: "",
    from: "2025-06-09",
    to: "",
    current: false,
    description: "",
  });
  const [toggleCurrent, setToggleCurrent] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const addExp = async (body: ExpForm) => {
    const res = await axios.put("/profile/experience", body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Success");
    return res.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: addExp,
    onSuccess: () => {
      toast.success("Experience Added!");
      navigate("/dashboard");
    },
    onError: (err) => {
      console.error(err.stack);
      toast.error("Failed to add Experience!");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { title, company, location, from, to, current, description } = formData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      title,
      company,
      location,
      from,
      ...(to ? { to } : {}),
      current,
      description,
    };
    console.log(body);
    mutate(body);
  };
  return (
    <>
      <section className="container">
        <h1 className="large text-primary">Add An Experience</h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Job Title"
              name="title"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Company"
              name="company"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" onChange={handleChange} />
          </div>
          <div className="form-group">
            <p>
              <input
                type="checkbox"
                name="current"
                value=""
                onChange={(e) => {
                  const { name, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    [name]: checked,
                  }));
                }}
                onClick={() => setToggleCurrent(!toggleCurrent)}
              />{" "}
              Current Job
            </p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              disabled={toggleCurrent}
              name="to"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols={30}
              rows={5}
              placeholder="Job Description"
              onChange={handleTextArea}
            ></textarea>
          </div>
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

export default AddExperience;
