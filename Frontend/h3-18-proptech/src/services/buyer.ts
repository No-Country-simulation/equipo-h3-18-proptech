import axios from "axios";
import { authHeaders, backend } from ".";

export const sendLoanRequest = async (data: FormData) => {
  try {
    const response = await backend.post("/LoanRequest/sendLoanRequest", data, {
      headers: authHeaders(),
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};