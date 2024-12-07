import axios from "axios";
import { authHeaders, backend } from ".";

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

export const updateEmailPhone = async ({
  email,
  phoneNumber,
}: {
  email: string;
  phoneNumber: string;
}) => {
  try {
    const response = await backend.put(
      "/DataUser/updateEmailPhone",
      { email, phoneNumber },
      { headers: authHeaders() }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const sendValidationInfo = async (data: FormData) => {
  try {
    const response = await backend.post(
      "/Identity/sendValidationRequest",
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
