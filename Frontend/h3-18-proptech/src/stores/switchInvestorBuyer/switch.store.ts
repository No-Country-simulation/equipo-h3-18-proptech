import { create } from "zustand";

interface SwitchState {
  role: "buyer" | "investor";
  setBuyer: () => void;
  setInvestor: () => void;
}

export const useSwitchStore = create<SwitchState>()((set) => ({
  role: "buyer",
  setBuyer: () =>
    set(() => ({
      role: "buyer",
    })),
  setInvestor: () =>
    set(() => ({
      role: "investor",
    })),
}));
