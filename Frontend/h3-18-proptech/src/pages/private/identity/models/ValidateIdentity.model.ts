import { z } from "zod";

const userFilesSchema = z.instanceof(File);

export const validateIdentitySchema = z.object({
  DNI: z
    .string()
    .min(1, "Introduce tu DNI")
    .regex(/^[\d]{7,8}$/, "El DNI debe contener entre 7 y 8 caracteres"),
  CUIT: z
    .string()
    .min(1, "Introduce tu CUIT")
    .regex(/^\d{2}\-?\d{8}\-?\d{1}$/, "Ingresa un CUIT válido"),
  files: z
    .array(userFilesSchema)
    .length(
      3,
      "Debes adjuntar 3 archivos: Una foto de tu rostro, el anverso del DNI y el reverso del DNI"
    ),
});
