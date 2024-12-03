import { create } from "zustand";
import { UserRole } from "../../interfaces/User";
import { LoginResponse } from "../../interfaces/Responses";
import { toast } from "sonner";

interface SessionState {
  token: string;
  id: string;
  role: UserRole;
  session: boolean;
  newSession: (user: LoginResponse) => void;
  closeSession: () => void;
}

export const useSessionStore = create<SessionState>()((set) => ({
  token: "",
  id: "",
  role: "",
  session: false,
  newSession: ({ token, id, role }: LoginResponse) => {
    localStorage.setItem("user", JSON.stringify({ token, id, role }));
    set((state) => ({
      ...state,
      token,
      id,
      role,
      session: true,
    }));
  },
  closeSession: () => {
    localStorage.removeItem("user");
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
