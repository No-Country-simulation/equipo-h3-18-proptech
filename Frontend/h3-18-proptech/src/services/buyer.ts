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

export const getAllMyLoans = async () => {
  try {
    const response = await backend.get("/Loan/allMyLoans", {
      headers: authHeaders(),
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const getMyLoanDetails = async (
  id: string,
  _filterOption: "" | 0 | 1 | 2,
  _page: number
) => {
  try {
    const response = await backend.get(`/Loan/detailsLoan`, {
      headers: authHeaders(),
      params: {
        loanId: id,
        stateQuota: _filterOption,
        page: _page,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const getMyLoanDetailsAtPDF = async (id: string) => {
  try {
    const response = await backend.get(`/Loan/loanPDF`, {
      headers: authHeaders(),
      params: {
        loanId: id,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};
