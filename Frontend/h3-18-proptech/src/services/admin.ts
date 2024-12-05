import axios from "axios";
import { authHeaders, backend } from ".";

export const getAllUsersToValidate = async () => {
  try {
    const response = await backend.get("/DataUser/requestValidationPending", {
      headers: authHeaders(),
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const getUserToValidate = async (dni:string) => {
  try {
    const response = await backend.get(`/DataUser/detailsRequestValidation/${dni}`, {
      headers: authHeaders(),
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const validateIdentity = async (dni:string) => {
  try {
    const response = await backend.post(`/DataUser/validateIdentity/${dni}`,dni, {
      headers: authHeaders(),
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const rejectIdentity = async (dni:string) => {
  try {
    const response = await backend.post(`/DataUser/rejectValidationIdentity/${dni}`,dni, {
      headers: authHeaders(),
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const getAllLoanRequests = async () => {
  try {
    const response = await backend.get("/Loan/allLoanRequestPending", {
      headers: authHeaders(),
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};