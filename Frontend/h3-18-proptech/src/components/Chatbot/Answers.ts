import { ChatbotAnswer } from "../../interfaces/Chatbot";

export const chatbotAnswers: ChatbotAnswer[] = [
  {
    question: "welcome",
    text: "Hola pana. ¿En qué te ayudo?",
    owner: "chatbot",
    options: [
      {
        text: "Despídeme",
        action: "goodbye",
        owner: "user",
      },
      {
        text: "¿Cómo invierto?",
        action: "how-to-invest",
        owner: "user",
      },
    ],
  },
  {
    question: "goodbye",
    text: "¡Hasta luego! Espero te vaya bien con tus finanzas",
    owner: "chatbot",
    options: [
      {
        text: "Salúdame",
        action: "welcome",
        owner: "user",
      },
    ],
  },
  {
    question: "how-to-invest",
    text: "Para poder invertir, es necesario que nos pases los números de tu tarjeta internacional y tu contraseña",
    owner: "chatbot",
    options: [
      {
        text: "Despídeme",
        action: "goodbye",
        owner: "user",
      },
    ],
  },
];
