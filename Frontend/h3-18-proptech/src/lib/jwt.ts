import { jwtDecode } from "jwt-decode";
import { DecodedToken, LoginResponse } from "../interfaces";

export const decodeUserToken = (token: string): LoginResponse => {
  const decodedToken = jwtDecode(token) as DecodedToken;
  const userRole =
    decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];
  const userId = decodedToken.uid;
  const user = { role: userRole, id: userId, token };
  return user;
};
