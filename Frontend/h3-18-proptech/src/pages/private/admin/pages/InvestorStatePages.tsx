import { CustomTable, DataTable } from "../components";

export function InvestorStatePages() {
  return (
    <>
      <h3 className="text-headline-small-medium my-6 w-[90%]  max-w-[700px]">
        Estado de inversiones
      </h3>
      <CustomTable data={dataValidate} headers={validateHeader} />
    </>
  );
}

export default InvestorStatePages;

const validateHeader = ["Nombre completo", "Monto invertido", "Meses activos"];

const dataValidate: DataTable[] = [
  {
    id: 1,
    name: "juan Perez",
    amount: 1200,
    activeMonths: 4,
  },
  {
    id: 2,
    name: "Carlos gomez",
    amount: 10000,
    activeMonths: 8,
  },
  {
    id: 3,
    name: "Financi Bot",
    amount: 3570.541,
    activeMonths: 14,
  },
];
