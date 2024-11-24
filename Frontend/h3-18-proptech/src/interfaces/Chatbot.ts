export interface ChatMessage {
  text: string;
  owner: MessageOwner;
}

export interface UserOption extends ChatMessage {
  action: string;
}

export interface ChatbotAnswer extends ChatMessage {
  question: string;
  options: UserOption[];
}

type MessageOwner = "chatbot" | "user";
