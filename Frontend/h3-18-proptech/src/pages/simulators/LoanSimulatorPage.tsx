import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface UserLoan {
  financing: number; // Monto solicitado para la compra de un terreno
  paymentPlan: number; // Cantidad de Cuotas en las que se desea pagar el financiamiento
  initial: number; // Pago inicial
  discountByInitial: number; // Valor que depende de si el pago inicial es mayor al 30% del monto real
  monthlyPayment: number; // Cuota a pagar por cada mes
  minimalSalary: number; // Salario mínimo necesario para poder recibir el financiamiento
  realLoan: number; // Monto Real. Valor que se obtiene restando el monto solicitado por el pago inicial
  interest: string; // Tasa de Interés
  totalPayment: number; // Pago Total
}

const monthlyReinforcement = {
  6: (175710 / 1000000) * 1.05,
  9: (119790 / 1000000) * 1.05,
  12: (91860 / 1000000) * 1.05,
  18: (63990 / 1000000) * 1.05,
  24: (50110 / 1000000) * 1.05,
  30: (41830 / 1000000) * 1.05,
  36: (36340 / 1000000) * 1.05,
  48: (29570 / 1000000) * 1.05,
  60: (25600 / 1000000) * 1.05,
  72: (23020 / 1000000) * 1.05,
  84: (21240 / 1000000) * 1.05,
  96: (19950 / 1000000) * 1.05,
  120: (18260 / 1000000) * 1.05,
  150: (17060 / 1000000) * 1.05,
  180: (16380 / 1000000) * 1.05,
};

export function LoanSimulatorPage() {
  const { handleSubmit, register } = useForm({
    defaultValues: { financing: 0, paymentPlan: 6, initial: 0 },
  });

  const [loan, setLoan] = useState<UserLoan>();

  const getPaymentPerMonth = (
    paymentPlan: number,
    financing: number,
    initial: number,
    discountByInitial: number,
    realLoan: number
  ) => {
    const monthlyInterestRate = monthlyReinforcement[paymentPlan as 6];

    return initial > (financing * 30) / 100
      ? Math.round(monthlyInterestRate * realLoan)
      : Math.round(monthlyInterestRate * realLoan * discountByInitial);
  };

  const onSubmit = (data: FieldValues) => {
    const financing = Number(data.financing);
    const paymentPlan = Number(data.paymentPlan);
    const initial = Number(data.initial);

    const discountByInitial = paymentPlan > 30 ? 1.15 : 1.075;
    const realLoan = financing - initial;
    const interest = (
      (monthlyReinforcement[paymentPlan as 6] * paymentPlan - 1) *
      100
    ).toFixed(2);

    const monthlyPayment = getPaymentPerMonth(
      paymentPlan,
      financing,
      initial,
      discountByInitial,
      realLoan
    );

    setLoan({
      financing,
      paymentPlan,
      initial,
      discountByInitial,
      monthlyPayment,
      minimalSalary: monthlyPayment * 4,
      realLoan,
      interest,
      totalPayment: monthlyPayment * paymentPlan,
    });
  };

  return (
    <main className="bg-slate-200 min-h-screen">
      <section className="flex flex-col items-center justify-center pt-10 gap-y-10 w-fit mx-auto p-4">
        <article className="shadow-md bg-white p-8 rounded-md h-fit flex flex-col gap-x-10 max-w-lg">
          <section className="flex flex-col">
            <h1 className="text-3xl font-bold mb-2">Simulador de Préstamos</h1>
            <p className="text-slate-600">
              Establece el monto de la financiación y obtendrás como
              resultado la cantidad a pagar por cuota
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2 pt-5"
            >
              <div className="flex flex-col gap-y-1 w-100">
                <label className="font-bold">Costo del Lote:</label>
                <input
                  type="number"
                  className="border border-black px-2 py-1 rounded-md w-100"
                  {...register("financing")}
                />
              </div>
              <div className="flex flex-col gap-y-1 w-100">
                <label className="font-bold">Inicial:</label>
                <input
                  type="number"
                  className="border border-black px-2 py-1 rounded-md"
                  {...register("initial")}
                />
                <span className="text-xs ps-2 text-gray-700">
                  Si tu inicial supera el 30% del Costo del Lote, tendrás
                  beneficios
                </span>
              </div>
              <div className="flex flex-col gap-y-1 w-100">
                <label className="font-bold">Cantidad de Cuotas:</label>
                <select
                  {...register("paymentPlan")}
                  className="border border-black p-1 rounded-md"
                >
                  {[
                    6, 9, 12, 18, 24, 30, 36, 48, 60, 72, 84, 96, 120, 150, 180,
                  ].map((number) => {
                    return <option value={number}>{number} meses</option>;
                  })}
                </select>
              </div>
              <button
                className="mt-5 bg-blue-600 text-white px-4 py-2 w-100 rounded-md"
                type="submit"
              >
                Simular Financiamiento
              </button>
            </form>
          </section>
        </article>
        {loan && (
          <article className="bg-white p-6 w-full flex flex-col shadow-md rounded-md gap-2">
            <h1 className="text-2xl font-bold mb-1">
              Resumen de la Financiación
            </h1>

            <div className="flex flex-col">
              <div className="flex gap-1">
                <p className="font-bold">Cuota Mensual:</p>
                <span>{loan.monthlyPayment}</span>
              </div>
              <span className="text-xs text-gray-700">
                {`Ten en cuenta que tu sueldo neto debe ser mayor a ${loan.minimalSalary}`}
              </span>
            </div>

            <div className="flex gap-1">
              <p className="font-bold">Tasa de Interés:</p>
              <span>{loan.interest}%</span>
            </div>

            <div className="flex gap-1">
              <p className="font-bold">Monto a Financiar:</p>
              <span>{loan.realLoan}</span>
            </div>

            <div className="flex gap-1">
              <p className="font-bold">Pago total:</p>
              <span className="font-normal">{loan.totalPayment}</span>
            </div>
          </article>
        )}
      </section>
    </main>
  );
}

export default LoanSimulatorPage;
