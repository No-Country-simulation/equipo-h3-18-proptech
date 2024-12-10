export interface RegisterUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  rol: UserRole;
  username: string;
}

export interface LoginUser {
    email: string;
    password: string;
  }

export interface UserProfile {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cuit: string;
  dni: string;
  stateValidation: number;
}

export type UserRole = "Cliente" | "Inversor" | "Administrador" | ""
