import axios from "axios";
import { getCookie } from "../lib";

export const backend = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

export const authHeaders = () => {
  const { token } = getCookie("user");
  return { Authorization: `Bearer ${token}` };
};
