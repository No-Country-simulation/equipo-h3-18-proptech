import { CustomTable, DataTable } from "../components/CustomTable";

export function ValidateTablePage() {
  return (
    <>
      <h3 className="text-headline-small-medium my-6 w-[90%]  max-w-[700px]">
        Validar identidad
      </h3>
      <CustomTable data={dataValidate} headers={validateHeader} />
    </>
  );
}

export default ValidateTablePage;

const validateHeader = ["Nombre completo", "rol"];

const dataValidate: DataTable[] = [
  {
    id: 1,
    name: "juan Perez",
    role: "cliente",
  },
  {
    id: 2,
    name: "Carlos gomez",
    role: "cliente",
  },
  {
    id: 3,
    name: "Financi Bot",
    role: "inversor",
  },
];
