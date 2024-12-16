import axios from "axios";
import { authHeaders, backend } from ".";

interface Inversion {
  amount: number;
}

export const getMyInversion = async () => {
  try {
    const response = await backend.get("/Investmant/dashboardInvestmant", {
      headers: authHeaders(),
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const addInversion = async (data: Inversion) => {
  try {
    const response = await backend.post("/Investmant/addInvestmant", data, {
      headers: authHeaders(),
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const extractInversion = async (data: Inversion) => {
  try {
    const response = await backend.put("/Investmant/extractAmount", data, {
      headers: authHeaders(),
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};
