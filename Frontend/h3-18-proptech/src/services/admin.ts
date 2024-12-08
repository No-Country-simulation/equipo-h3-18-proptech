import axios from "axios";
import { authHeaders, backend } from ".";

export const getAllUsersToValidate = async () => {
  try {
    const response = await backend.get("/Identity/requestValidationPending", {
      headers: authHeaders(),
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const getUserToValidate = async (dni: string) => {
  try {
    const response = await backend.get(
      `/Identity/detailsRequestValidation/${dni}`,
      {
        headers: authHeaders(),
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const validateIdentity = async (dni: string) => {
  try {
    const response = await backend.put(
      `/Identity/validateIdentity/${dni}`,
      dni,
      {
        headers: authHeaders(),
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const rejectIdentity = async (dni: string) => {
  try {
    const response = await backend.put(
      `/Identity/rejectValidationIdentity/${dni}`,
      dni,
      {
        headers: authHeaders(),
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const getAllLoanRequests = async () => {
  try {
    const response = await backend.get("/LoanRequest/allLoanRequestPending", {
      headers: authHeaders(),
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const getDetailsLoanRequests = async (id: string) => {
  try {
    const response = await backend.get(
      `/LoanRequest/detailsLoanRequest/${id}`,
      {
        headers: authHeaders(),
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const validateLoan = async (id: string) => {
  try {
    const response = await backend.put(
      `/LoanRequest/validateLoanRequest/${id}`,
      id,
      {
        headers: authHeaders(),
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const rejectLoan = async (id: string) => {
  try {
    const response = await backend.put(
      `/LoanRequest/rejectLoanRequest/${id}`,
      id,
      {
        headers: authHeaders(),
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const getAllLoans = async () => {
  try {
    const response = await backend.get("/Loan/allLoan", {
      headers: authHeaders(),
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const getDetailsLoan = async (
  id: string,
  _filterOption: "" | 0 | 1 | 2,
  _page: number
) => {
  try {
    const response = await backend.get(`/Loan/detailsLoanAdmin/`, {
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
