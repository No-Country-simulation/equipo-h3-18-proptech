import { z } from "zod";

export const loanSimulatorSchema = z
  .object({
    financing: z.coerce
      .number({ message: "Debes introducir un número" })
      .nonnegative({ message: "Por favor, introduzca un número positivo" }),
    paymentPlan: z.coerce
      .number({ message: "Debes introducir un número" })
      .nonnegative({ message: "Por favor, introduzca un número positivo" }),
    initial: z.coerce
      .number({ message: "Debes introducir un número" })
      .nonnegative({ message: "Por favor, introduzca un número positivo" }),
  })
  .superRefine(({ financing, initial }, ctx) => {
    if (initial > financing) {
      ctx.addIssue({
        message: "El Adelanto debe ser menor al Costo del Lote",
        path: ["initial"],
        code: "custom",
      });
    }
  });
