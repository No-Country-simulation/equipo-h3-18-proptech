import { create } from "zustand";
import {
  ChatbotAnswer,
  ChatMessage,
  UserOption,
} from "../../interfaces/Chatbot";

interface ChatbotState {
  messages: ChatMessage[];
  options: UserOption[];
  addNewMessage: (newMessage: ChatbotAnswer) => void;
}

export const useChatbotStore = create<ChatbotState>()((set) => ({
  messages: [],
  options: [],

  addNewMessage: (newMessage: ChatbotAnswer) =>
    set((state) => ({
      messages: [...state.messages, newMessage],
      options: [...newMessage.options],
    })),
}));
