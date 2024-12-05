import { toast } from "sonner";
import { create } from "zustand";
import { UserRole} from "../../interfaces";
import { decodeUserToken, deleteCookie, setCookie } from "../../lib";

interface SessionState {
  token: string;
  role: UserRole;
  session: boolean;
  newSession: (user: string) => string;
  closeSession: () => void;
}

export const useSessionStore = create<SessionState>()((set) => ({
  token: "",
  role: "",
  session: false,
  newSession: (token: string) => {
    const {exp, role} = decodeUserToken(token)
    setCookie("user", JSON.stringify({ token }), exp);
    set((state) => ({
      ...state,
      token,
      role,
      session: true,
    }));
    return role
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
