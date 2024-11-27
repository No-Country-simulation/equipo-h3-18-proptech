import { To } from "react-router-dom";
import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  title: string;
  content: { label: string; value: string | number; info?: string }[];
  buttonTitle: string;
  buttonLink: To;
  showModal: ({
    title,
    content,
    buttonTitle,
    buttonLink,
  }: {
    title: string;
    content: { label: string; value: string | number; info?: string }[];
    buttonTitle: string;
    buttonLink: To;
  }) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isOpen: false,
  title: "",
  content: [],
  buttonTitle: "",
  buttonLink: "",

  showModal({ title, content, buttonTitle, buttonLink }) {
    set(() => ({
      title,
      content,
      buttonTitle,
      buttonLink,
      isOpen: true,
    }));
  },
  closeModal() {
    set(() => ({
      title: "",
      content: [],
      buttonTitle: "",
      buttonLink: "",
      isOpen: false,
    }));
  },
}));
