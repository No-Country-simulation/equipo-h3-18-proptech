import axios from "axios";
import { backend } from "./server";

export const sendValidationInfo = async (data: FormData) => {
  try {
    const response = await backend.post(
      "/DataUser/sendValidationRequest",
      data
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};
