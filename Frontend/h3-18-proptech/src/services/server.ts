import axios from "axios";
import { LoginResponse } from "../interfaces";

export const backend = axios.create({
  baseURL: "https://www.equipo-h3-18-proptechbackend.somee.com/api",
});

export const authHeaders = () => {
  const { token } = JSON.parse(
    localStorage.getItem("user") ?? ""
  ) as LoginResponse;
  return { Authorization: `Bearer ${token}` };
};
