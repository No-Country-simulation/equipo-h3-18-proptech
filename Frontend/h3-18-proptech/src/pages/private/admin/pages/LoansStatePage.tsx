import { CustomTable, DataTable } from "../components/CustomTable";

export function LoansStatePage() {
  return (
    <>
      <h3 className="text-headline-small-medium my-6 w-[90%]  max-w-[700px]">
        Estado de prestamos
      </h3>
      <CustomTable data={dataValidate} headers={validateHeader} />
    </>
  );
}

export default LoansStatePage;

const validateHeader = ["Nombre completo", "Estado", "Cuotas atrasadas"];

const dataValidate: DataTable[] = [
  {
    id: 1,
    name: "juan Perez",
    state: "Pagado",
    overdue: 0,
  },
  {
    id: 2,
    name: "Carlos gomez",
    state: "Pagado",
    overdue: 0,
  },
  {
    id: 3,
    name: "Financi Bot",
    state: "Atrasado",
    overdue: 2,
  },
];
