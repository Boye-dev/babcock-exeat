import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000",
  // baseURL: "https://westway-application.herokuapp.com",
  // baseURL: "https://westway.world",
  withCredentials: true,
  credentials: "include",
});
