import axios from "axios";
import { LoginUser, RegisterUser } from "../interfaces";
import { backend } from ".";

export const authRegister = async (data: RegisterUser) => {
  try {
    const response = await backend.post("/v1/Account/Register", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const authLogin = async (data: LoginUser) => {
  try {
    const response = await backend.post("/v1/Account/Login", data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};
