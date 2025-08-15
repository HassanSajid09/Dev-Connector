import axios from "axios";

const instance = axios.create({
  baseURL: "https://dev-connnector.netlify.app",
});

export default instance;
