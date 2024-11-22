export interface ChatbotAnswer {
  question: string;
  text: string;
  owner: "chatbot" | "user";
  options: UserOption[];
}

export interface UserOption {
  text: string;
  action: string;
  owner: "chatbot" | "user";
}

export interface ChatMessage {
  text: string;
  owner: "chatbot" | "user";
  action?: string;
}
