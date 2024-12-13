import { CustomTable, DataTable, HeaderWithPagination } from "../components";

export function InvestorStatePages() {
  return (
    <>
      <HeaderWithPagination title="Estado de inversiones" maxPages={2} />
      <CustomTable data={dataValidate} headers={validateHeader} />
    </>
  );
}

export default InvestorStatePages;

const validateHeader = ["Nombre completo", "Monto invertido", "Meses activos"];

const dataValidate: DataTable[] = [
  {
    investorid: "4d010f99-1d0e-4484-8949-b5f48fe27090",
    fullName: "juan Perez",
    amount: 1200,
    activeMonths: 4,
  },
  {
    investorid: "a143cc03-5dba-4965-abd6-e4e21e3e6b7b",
    fullName: "Carlos gomez",
    amount: 10000,
    activeMonths: 8,
  },
  {
    investorid: "3b454ee6-c2c0-4ce6-930c-4ae4ebdaa3ff",
    fullName: "Gastón Gonzalez",
    amount: 3570.541,
    activeMonths: 14,
  },
];
