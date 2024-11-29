import { z } from "zod";

export const profileSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Introduce tu número de teléfono")
    .regex(
      /^(\(?\+[\d]{1,3}\)?)\s?([\d]{1,5})\s?([\d][\s\.-]?){6,7}$/,
      "Ingrese un número de teléfono válido"
    ),
  email: z.string().email("Ingrese un correo electrónico válido"),
});
