import { ChatbotAnswer } from "../../interfaces/Chatbot";

export const chatbotAnswers: ChatbotAnswer[] = [
  {
    question: "welcome",
    text: "¡Hola! Soy Financibot. Estoy aquí para resolver todas tus dudas. ¿En qué te puedo ayudar?",
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
    text: "¡Comenzar a invertir es muy fácil! No necesitas tener conocimientos financieros complejos, solo decidir cuánto dinero quieres que se multiplique a través de nuestras tasas de rendimiento",
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
