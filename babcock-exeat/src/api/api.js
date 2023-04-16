import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:4000",
  baseURL: "https://babcock-exeat.cyclic.app/",
  withCredentials: true,
  credentials: "include",
});
