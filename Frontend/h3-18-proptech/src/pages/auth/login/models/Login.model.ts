import { z } from "zod";

export const schema = z.object({
  dni: z.string().min(1, "El DNI es obligatorio"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type FormValues = z.infer<typeof schema>;
