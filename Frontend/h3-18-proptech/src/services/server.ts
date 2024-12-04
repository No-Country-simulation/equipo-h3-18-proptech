import axios from "axios";
import { getCookie } from "../lib";

export const backend = axios.create({
  baseURL: "https://www.equipo-h3-18-proptechbackend.somee.com/api",
});

export const authHeaders = () => {
  const { token } = getCookie("user");
  return { Authorization: `Bearer ${token}` };
};
