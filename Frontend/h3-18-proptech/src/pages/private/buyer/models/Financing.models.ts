import { z } from "zod";

const userFilesSchema = z.instanceof(File);
export const guarantorDataSchema = z.object({
  name: z
    .string()
    .min(1, "Introduce tu nombre")
    .max(40, "Ingrese un nombre con máximo 40 caracteres"),
  lastname: z
    .string()
    .min(1, "Introduce tu apellido")
    .max(40, "Ingrese un apellido con máximo 40 caracteres"),
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
      7,
      "Debes adjuntar 7 archivos: Una foto de tu rostro, el anverso y el reverso del DNI, tus últimos 3 recibos de sueldo y un comprobante que valide tu domicilio actual"
    ),
  phoneNumber: z
    .string()
    .min(1, "Introduce tu número de teléfono")
    .regex(
      /^(\(?\+[\d]{1,3}\)?)\s?([\d]{1,5})\s?([\d][\s\.-]?){6,7}$/,
      "Ingrese un número de teléfono válido"
    ),
  email: z.string().email("Ingrese un correo electrónico válido"),
});

export const FinanceSchema = z.object({
  files: z
    .array(userFilesSchema)
    .length(
      4,
      "Debes adjuntar 4 archivos: Tus últimos tres recibos de sueldo y una boleta de sevicio que valide tu dirección actual"
    ),
  guarantors: z.array(guarantorDataSchema),
});

export type FinancingDataForm = z.infer<typeof FinanceSchema>;
