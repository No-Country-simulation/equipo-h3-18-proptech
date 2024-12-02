import { z } from "zod";

const userFilesSchema = z.instanceof(File);

export const FinanceSchema = z.object({
  files: z
    .array(userFilesSchema)
    .length(
      4,
      "Debes adjuntar 4 archivos: Tus últimos tres recibos de sueldo y una boleta de sevicio que valide tu dirección actual"
    ),
  // AGREGAR GARANTES
});

export type FinancingDataForm = z.infer<typeof FinanceSchema>;