import { z } from "zod";

//const roles = ["inversor", "comprador"]

export const userSchema = z
  .object({
    name: z
      .string()
      .min(1, "Introduce tu nombre")
      .max(40, "Ingrese un nombre con máximo 40 caracteres"),
    lastname: z
      .string()
      .min(1, "Introduce tu apellido")
      .max(40, "Ingrese un apellido con máximo 40 caracteres"),
    dni: z
      .string()
      .min(1, "Introduce tu DNI")
      .regex(/^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/, "Ingrese un DNI válido"),
    cuit: z
      .string()
      .min(1, "Introduce tu CUIT")
      .regex(
        /^([0-9]{11}|[0-9]{2}-[0-9]{8}-[0-9]{1})$/,
        "Ingrese un número de CUIT válido"
      ),
    email: z.string().email("Ingrese un correo electrónico válido"),
    password: z
      .string()
      .min(8, "Ingrese una contraseña con al menos 8 caracteres"),
    confirm_password: z
      .string()
      .min(8, "Ingrese una contraseña con al menos 8 caracteres"),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        message: "Las contraseñas deben ser iguales",
        path: ["confirm_password"],
        code: "custom",
      });
    }
  });
