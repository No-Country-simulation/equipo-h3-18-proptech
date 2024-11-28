export interface RegisterUser {
  name: string;
  lastname: string;
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

type UserRole = "Cliente" | "Inversor"
