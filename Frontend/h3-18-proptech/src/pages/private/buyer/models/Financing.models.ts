import { z } from "zod";

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
  Photo: z.instanceof(File, {
    message:
      "Introduce una imagen o archivo que contenga una foto de tu rostro",
  }),
  Front: z.instanceof(File, {
    message:
      "IIntroduce una imagen o archivo que contenga el frente de tu DN",
  }),
  Back: z.instanceof(File, {
    message:
      "Introduce una imagen o archivo que contenga el reverso de tu DN",
  }),
  salaryReceipt1: z.instanceof(File, {
    message:
      "Introduce una imagen o archivo que contenga el recibo de hace un mes del salario del garante",
  }),
  salaryReceipt2: z.instanceof(File, {
    message:
      "Introduce una imagen o archivo que contenga el recibo de hace 2 meses del salario del garante",
  }),
  salaryReceipt3: z.instanceof(File, {
    message:
      "Introduce una imagen o archivo que contenga el recibo de hace 3 meses del salario del garante",
  }),
  homeReceipt: z.instanceof(File, {
    message:
      "Introduce una imagen o archivo que contenga un comprobante del domicilio actual del garante",
  }),
  phoneNumber: z
    .string()
    .min(1, "Introduce tu número de teléfono")
    .regex(/^(\+54)?\d{10,17}$/, "Ingrese un número de teléfono válido"),
  email: z.string().email("Ingrese un correo electrónico válido"),
});

export const FinanceSchema = z
  .object({
    lotCost: z.coerce
      .number({ message: "Debes introducir un número" })
      .nonnegative({ message: "Por favor, introduzca un número positivo" })
      .gt(0, "El costo del Lote no puede ser 0"),
    quotasCount: z.coerce
      .number({ message: "Debes introducir un número" })
      .nonnegative({ message: "Por favor, introduzca un número positivo" }),
    downPayment: z.coerce
      .number({ message: "Debes introducir un número" })
      .nonnegative({ message: "Por favor, introduzca un número positivo" }),
      cardNumber: z.coerce
      .number({ message: "Debes introducir un número" })
      .nonnegative({ message: "Por favor, introduzca un número positivo" })
      .refine((value) => `${value}`.length === 16 || `${value}`.length === 17, 'Introduzca un número de tarjeta que contenga 16 o 17 dígitos'),
    salaryReceipt1: z.instanceof(File, {
      message:
        "Introduce una imagen o archivo que contenga el recibo de hace un mes de tu salario",
    }),
    salaryReceipt2: z.instanceof(File, {
      message:
        "Introduce una imagen o archivo que contenga el recibo de hace 2 meses de tu salario",
    }),
    salaryReceipt3: z.instanceof(File, {
      message:
        "Introduce una imagen o archivo que contenga el recibo de hace 3 meses de tu salario",
    }),
    homeReceipt: z.instanceof(File, {
      message:
        "Introduce una imagen o archivo que contenga un comprobante de tu domicilio actual",
    }),
    guarantors: z.array(guarantorDataSchema),
  })
  .superRefine(({ lotCost, downPayment }, ctx) => {
    if (downPayment > lotCost) {
      ctx.addIssue({
        message: "El Adelanto debe ser menor al Costo del Lote",
        path: ["downPayment"],
        code: "custom",
      });
    }
  });

export type RequestLoanForm = z.infer<typeof FinanceSchema>;
