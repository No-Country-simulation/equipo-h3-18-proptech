import { z } from "zod";

export const validateIdentitySchema = z.object({
  DNI: z
    .string()
    .min(1, "Introduce tu DNI")
    .regex(/^[\d]{7,8}$/, "El DNI debe contener entre 7 y 8 caracteres"),
  CUIT: z
    .string()
    .min(1, "Introduce tu CUIT")
    .regex(/^\d{2}\-?\d{8}\-?\d{1}$/, "Ingresa un CUIT válido"),
  Front: z.instanceof(File, {
    message: "Introduce una imagen o archivo que contenga el frente de tu DNI",
  }),
  Back: z.instanceof(File, {
    message: "Introduce una imagen o archivo que contenga el reverso de tu DNI",
  }),
  Photo: z.instanceof(File, {
    message: "Introduce una imagen o archivo que contenga una foto de tu rostro",
  }),
});
