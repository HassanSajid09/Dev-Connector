import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

interface LoginForm {
  email: string;
  password: string;
}
interface AuthResponse {
  token: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const LoginUser = async (body: LoginForm) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const res = await axios.post<AuthResponse>("/auth", body, config);
    return res.data;
  };

  const isAxiosError = (error: unknown): error is AxiosError => {
    return (
      typeof error === "object" && error !== null && "isAxiosError" in error
    );
  };
  const { mutate, isPending } = useMutation<AuthResponse, Error, LoginForm>({
    mutationFn: LoginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Login Success!");
      localStorage.setItem("reloadPostsPageOnce", "true");
      navigate("/dashboard");
    },
    onError: (err: unknown) => {
      if (isAxiosError(err)) {
        const status = err.response?.status;

        if (status === 400) {
          toast.error("Invalid Credentials!");
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

    const { email, password } = formData;
    mutate({ email, password });
  };
  return (
    <>
      <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {isPending ? "Logging In..." : "Login"}
          </button>
        </form>
        <p className="my-1">
          Don't have an account? <NavLink to="/register">Sign Up</NavLink>
        </p>
      </section>
    </>
  );
};

export default Login;
