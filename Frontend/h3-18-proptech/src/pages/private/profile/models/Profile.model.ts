import { z } from "zod";

export const profileSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Introduce tu número de teléfono")
    .regex(
      /^(\+54)?\d{10,17}$/,
      "Ingrese un número de teléfono válido"
    ),
  email: z.string().email("Ingrese un correo electrónico válido"),
});
