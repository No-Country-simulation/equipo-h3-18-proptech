import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Introduce tu nombre")
      .max(40, "Ingrese un nombre con máximo 40 caracteres"),
    lastName: z
      .string()
      .min(1, "Introduce tu apellido")
      .max(40, "Ingrese un apellido con máximo 40 caracteres"),
    phoneNumber: z
      .string()
      .min(1, "Introduce tu número de teléfono")
      .regex(
        /^(\+54)?\d{10,17}$/,
        "Ingrese un número de teléfono válido"
      ),
    email: z.string().email("Ingrese un correo electrónico válido"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,30}$/,
        "Ingresa una contraseña con al menos 8 caracteres, letras mayúsculas y minúsculas, números y caracteres especiales (@, #, $, %)."
      ),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        message: "Las contraseñas deben ser iguales",
        path: ["confirmPassword"],
        code: "custom",
      });
    }
  });
