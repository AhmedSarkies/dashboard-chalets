import axios from "axios";
import Cookies from "js-cookie";

const Http = axios.create({
  baseURL: process.env.REACT_APP_DASHBOARD_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    Authorization: `Bearer ${Cookies.get("_auth")}`,
  },
});

export default Http;
