import { z } from "zod";

export const schema = z.object({
  email: z.string().email("No es un Email correcto").min(1, "El Email es obligatorio"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type FormValues = z.infer<typeof schema>;
