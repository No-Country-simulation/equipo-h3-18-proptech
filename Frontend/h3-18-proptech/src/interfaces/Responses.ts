import { UserRole } from "./User";

export interface LoginResponse {
  role: UserRole;
  id: string;
  token: string;
}

export interface DecodedToken {
  sub: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  uid: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": UserRole;
  exp: number;
  iss: string;
  aud: string;
}
