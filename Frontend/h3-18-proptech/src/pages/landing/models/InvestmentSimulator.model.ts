import { z } from "zod";

export const investmentSimulatorSchema = z
  .object({
    investment: z.coerce
      .number({ message: "Debes introducir un número" })
      .nonnegative({ message: "Por favor, introduzca un número positivo" }),
    months: z.coerce.number()
  })

  export type FormValues = z.infer<typeof investmentSimulatorSchema>;
