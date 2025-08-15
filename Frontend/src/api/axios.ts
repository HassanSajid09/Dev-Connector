import axios from "axios";

const instance = axios.create({
  baseURL: "https://dev-connector-q23u.onrender.com",
});

export default instance;
