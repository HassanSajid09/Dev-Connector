import { useState } from "react";
import axios from "../../api/axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

interface EduForm {
  institute: string;
  degree: string;
  fieldofstudy?: string;
  from: string;
  to?: string;
  current?: boolean;
  description: string;
}

const AddEducation = () => {
  const [formData, setFormData] = useState<EduForm>({
    institute: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toggleCurrent, setToggleCurrent] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const addEdu = async (body: EduForm) => {
    const res = await axios.put("/profile/education", body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Success");
    return res.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: addEdu,
    onSuccess: () => {
      toast.success("Education Added!");
      navigate("/dashboard");
    },
    onError: (err) => {
      console.error(err.stack);
      toast.error("Failed to add Education!");
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

  const { institute, degree, fieldofstudy, from, to, current, description } =
    formData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      institute,
      degree,
      fieldofstudy,
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
        <h1 className="large text-primary">Add Your Education</h1>
        <p className="lead">
          <i className="fas fa-graduation-cap"></i> Add any school, bootcamp,
          etc that you have attended
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Institute"
              name="institute"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Degree or Certificate"
              name="degree"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Field Of Study"
              name="fieldofstudy"
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
              Current Institute
            </p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              onChange={handleChange}
              disabled={toggleCurrent}
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols={30}
              rows={5}
              placeholder="Program Description"
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
          <NavLink className="btn btn-light my-1" to="/dashboard">
            Go Back
          </NavLink>
        </form>
      </section>
    </>
  );
};

export default AddEducation;
