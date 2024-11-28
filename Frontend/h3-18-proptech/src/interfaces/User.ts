export interface RegisterUser {
  nombre: string;
  apellido: string;
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
  nombre: string;
  apellido: string;
  email: string;
  phoneNumber: string;
  cuit: string;
  dni: string;
}

type UserRole = "Cliente" | "Inversor"
