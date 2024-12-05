import { toast } from "sonner";
import { create } from "zustand";
import { UserRole, LoginResponse } from "../../interfaces";
import { deleteCookie, setCookie } from "../../lib";

interface SessionState {
  token: string;
  role: UserRole;
  session: boolean;
  newSession: (user: LoginResponse) => void;
  closeSession: () => void;
}

export const useSessionStore = create<SessionState>()((set) => ({
  token: "",
  role: "",
  session: false,
  newSession: ({ token, role, exp }: LoginResponse) => {
    setCookie("user", JSON.stringify({ token, role }), exp);
    set((state) => ({
      ...state,
      token,
      role,
      session: true,
    }));
  },
  closeSession: () => {
    deleteCookie("user");
    toast.success("Sesión cerrada exitosamente");
    set((state) => ({
      ...state,
      token: "",
      id: "",
      role: "",
      session: false,
    }));
  },
}));
