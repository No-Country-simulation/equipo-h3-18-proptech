import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Ingrese un correo electrónico válido").min(1, "El Email es obligatorio"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type FormValues = z.infer<typeof loginSchema>;
