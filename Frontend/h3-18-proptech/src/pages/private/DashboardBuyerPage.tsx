import { Button } from "../../components/common";

function DashboardBuyerPage() {
  return (
    <div className="bg-[#F8F8F8] min-h-[750px] flex flex-col  items-center">
      <div className="flex justify-between w-[1050px] my-[60px]">
        <h2 className="text-headline-large-medium">Prestamos aprobados</h2>
        <Button color="primary-orange" size="medium">
          Solicitar financiación
        </Button>
      </div>
      <table className="w-[1050px] text-sm text-left rtl:text-right text-gray-500 bg-contrast">
        <thead className=" text-headline-small-bold">
          <tr>
            <th>Prestamo</th>
            <th>Cuotas</th>
            <th>Total</th>
            <th>Abonar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-headline-small-bold">Pagado</td>
            <td className="text-headline-small-medium">100</td>
            <td className="text-headline-small-medium">100</td>
            <td className="text-headline-small-medium">Pagar</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DashboardBuyerPage;
