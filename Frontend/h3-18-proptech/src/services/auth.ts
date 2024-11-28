import axios from "axios";
import { LoginUser, RegisterUser } from "../interfaces/User";

const backend = axios.create({
  baseURL: "https://www.equipo-h3-18-proptechbackend.somee.com/api/v1",
});

export const authRegister = async (data: RegisterUser) => {
  try {
    const response = await backend.post("/Account/Register", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const authLogin = async (data: LoginUser) => {
  try {
    const response = await backend.post("/Account/Login", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
