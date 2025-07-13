import { createRoot } from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import Register from "./components/Auth/Register.tsx";
import Login from "./components/Auth/Login.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import PubRoute from "./components/Routes/PubRoute.tsx";
import PrvRoute from "./components/Routes/PrvRoute.tsx";
import CreateProfile from "./components/Dashboard/CreateProfile.tsx";
import AddExperience from "./components/Dashboard/AddExperience.tsx";
import AddEducation from "./components/Dashboard/AddEducation.tsx";
import Profiles from "./components/Profiles/Profiles.tsx";
import Posts from "./components/Posts/Posts.tsx";
import UserProfile from "./components/Profiles/UserProfile.tsx";
import SinglePost from "./components/Posts/SinglePost.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <PubRoute />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/profiles",
    element: <Profiles />,
  },
  {
    path: "/profile/:id",
    element: <UserProfile />,
  },
  {
    element: <PrvRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/create-profile",
        element: <CreateProfile />,
      },
      {
        path: "/add-experience",
        element: <AddExperience />,
      },
      {
        path: "/add-education",
        element: <AddEducation />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/posts/:id",
        element: <SinglePost />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <Toaster />
  </QueryClientProvider>
);
