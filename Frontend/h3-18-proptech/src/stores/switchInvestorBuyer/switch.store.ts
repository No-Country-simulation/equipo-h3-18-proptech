import { create } from "zustand";

interface SwitchState {
  role: "buyer" | "investor";
  setRole: (role: "buyer" | "investor") => void;
}

export const useSwitchStore = create<SwitchState>()((set) => ({
  role: "buyer",
  setRole: (role: "buyer" | "investor") =>
    set(() => ({
      role,
    })),
}));
