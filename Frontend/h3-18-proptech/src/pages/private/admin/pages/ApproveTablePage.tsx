import { CustomTable, DataTable } from "../components";

export function ApproveTablePage() {
  return (
    <>
      <h3 className="text-headline-small-medium my-6 w-[90%]  max-w-[700px]">
        Aprobar Prestamos
      </h3>
      <CustomTable data={dataValidate} headers={validateHeader} />
    </>
  );
}

export default ApproveTablePage;

const validateHeader = ["Nombre completo"];

const dataValidate: DataTable[] = [
  {
    id: 1,
    name: "juan Perez",
  },
  {
    id: 2,
    name: "Carlos gomez",
  },
  {
    id: 3,
    name: "Financi Bot",
  },
];
