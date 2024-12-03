import axios from "axios";
import { authHeaders, backend } from "./server";

export const sendValidationInfo = async (data: FormData) => {
  try {
    const response = await backend.post(
      "/DataUser/sendValidationRequest",
      data,
      { headers: authHeaders() }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const getUserbyToken = async () => {
  try {
    const response = await backend.get("/DataUser/currentUser", {
      headers: authHeaders(),
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};
