import { useState } from "react";
import axios from "../../api/axios";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  cPassword?: string;
}
interface AuthResponse {
  token: string;
}

const Register = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const navigate = useNavigate();

  const RegisterUser = async (body: RegisterForm) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const res = await axios.post<AuthResponse>("/users", body, config);
    return res.data;
  };

  const isAxiosError = (error: unknown): error is AxiosError => {
    return (
      typeof error === "object" && error !== null && "isAxiosError" in error
    );
  };
  const { mutate, isPending } = useMutation<AuthResponse, Error, RegisterForm>({
    mutationFn: RegisterUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("User Registered Successfully!");
      navigate("/login");
    },
    onError: (err: unknown) => {
      if (isAxiosError(err)) {
        const status = err.response?.status;

        if (status === 400) {
          toast.error("User Already Exists!");
        } else {
          toast.error("Login Failed Please try again Later!");
        }
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password, cPassword } = formData;

    if (password !== cPassword) {
      toast.error("Password Doesn't Match!");
      return;
    } else {
      mutate({ name, email, password });
    }
  };
  return (
    <>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="cPassword"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            {isPending ? "Registering" : "Register"}
          </button>
        </form>
        <p className="my-1">
          Already have an account? <NavLink to="/login">Sign In</NavLink>
        </p>
      </section>
    </>
  );
};

export default Register;
