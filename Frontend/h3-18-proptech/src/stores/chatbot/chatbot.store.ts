import { create } from "zustand";
import { ChatbotAnswer, ChatMessage, UserOption } from "../../interfaces";

interface ChatbotState {
  messages: ChatMessage[];
  options: UserOption[];
  addNewMessage: (
    newMessage: ChatbotAnswer,
    selectedOption?: ChatMessage
  ) => void;
}

export const useChatbotStore = create<ChatbotState>()((set) => ({
  messages: [],
  options: [],

  addNewMessage: (newMessage: ChatbotAnswer, selectedOption?: ChatMessage) =>
    set((state) => ({
      messages: selectedOption
        ? [...state.messages, selectedOption, newMessage]
        : [...state.messages, newMessage],
      options: [...newMessage.options],
    })),
}));
