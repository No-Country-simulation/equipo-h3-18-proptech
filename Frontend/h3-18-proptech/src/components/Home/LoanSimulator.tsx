import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import SelectInput from "../common/SelectInput";
import Button from "../common/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loanSimulatorSchema } from "./models/LoanSimulator.model";
import NumberInput from "../common/NumberInput";

interface UserLoan {
  financing: number; // Monto solicitado para la compra de un terreno
  paymentPlan: number; // Cantidad de Cuotas en las que se desea pagar el financiamiento
  initial: number; // Pago inicial
  extra: number; // Valor que depende de si el pago inicial es mayor al 30% del monto real y la cantidad de cuotas seleccionadas
  monthlyPayment: number; // Cuota a pagar por cada mes
  minimalSalary: number; // Salario mínimo necesario para poder recibir el financiamiento
  realLoan: number; // Monto Real. Valor que se obtiene restando el monto solicitado por el pago inicial
  interest: string; // Tasa de Interés
  totalPayment: string; // Pago Total
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

function LoanSimulator() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { financing: 0, paymentPlan: 6, initial: 0 },
    resolver: zodResolver(loanSimulatorSchema),
  });

  const [loan, setLoan] = useState<UserLoan>({
    extra: 0,
    financing: 0,
    initial: 0,
    interest: "0",
    minimalSalary: 0,
    monthlyPayment: 0,
    paymentPlan: 6,
    realLoan: 0,
    totalPayment: "0",
  });
  const [openModal, setOpenModal] = useState(false);

  const onSubmit = (data: FieldValues) => {
    console.log(data);

    // Petición al Back

    const financing = Number(data.financing);
    const paymentPlan = Number(data.paymentPlan);
    const initial = Number(data.initial);

    const extra =
      initial > financing * 0.3 ? 1 : paymentPlan > 30 ? 1.15 : 1.075;

    const realLoan = financing - initial;
    const interest = (
      (monthlyReinforcement[paymentPlan as 6] * paymentPlan * extra - 1) *
      100
    ).toFixed(2);

    const monthlyPayment = Math.round(
      monthlyReinforcement[paymentPlan as 6] * realLoan * extra
    );

    const totalPayment = (
      realLoan +
      (realLoan * Number(interest)) / 100
    ).toFixed(2);

    setLoan({
      financing,
      paymentPlan,
      initial,
      extra,
      monthlyPayment,
      minimalSalary: monthlyPayment * 4,
      realLoan,
      interest,
      totalPayment,
    });
  };
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 lg:gap-24 w-full bg-tertiary py-10 md:py-20 px-6 relative">
        <aside className="flex flex-col">
          <h3 className="text-headline-medium-medium mb-8">
            Calcula tu financiamiento a medida
          </h3>
          <p className="text-title-large-regular max-w-[36ch] mb-7">
            Nuestro{" "}
            <span className="text-title-large-semi-bold">
              Simulador de Financiamiento
            </span>{" "}
            te permite explorar diferentes opciones de pago para la compra de tu
            terreno.
          </p>
          <p className="text-title-large-regular max-w-[36ch] mb-7">
            Personaliza el monto inicial y el número de cuotas, y obtén una
            estimación clara de las mensualidades.
          </p>
          <p className="text-title-large-bold max-w-[36ch] mb-0 md:mb-7">
            Ajusta el plan de financiamiento a tus necesidades.
          </p>
          <Button
            color="primary-orange"
            size="large"
            type="link"
            to="/register"
            classname="hidden md:flex"
          >
            Solicitar financiación
          </Button>
        </aside>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 pt-5"
        >
          <NumberInput
            label="Costo del Lote"
            name="financing"
            register={register}
            error={errors.financing}
          />
          <NumberInput
            label="Adelanto"
            name="initial"
            info="Si tu inicial supera el 30% del Costo del Lote, tendrás beneficios"
            register={register}
            error={errors.initial}
          />

          <SelectInput
            register={register}
            name="paymentPlan"
            label="Cantidad de Cuotas"
            options={[
              6, 9, 12, 18, 24, 30, 36, 48, 60, 72, 84, 96, 120, 150, 180,
            ].map((month) => ({
              value: month,
              label: `${month} meses`,
            }))}
          />
          <div onClick={() => setOpenModal(true)}>
            <Button
              type="submit"
              color="primary-blue"
              size="large"
              classname="mt-1"
            >
              Calcular
            </Button>
          </div>

          <Button
            color="primary-orange"
            size="large"
            type="link"
            to="/register"
            classname="flex md:hidden"
          >
            Solicitar financiación
          </Button>
        </form>
      </section>
      {/* Lo siguiente falta por diseño*/}
      <dialog
        className={`${openModal ? "opacity-100" : "scale-0 opacity-0"} transition-opacity h-full w-full absolute top-0 flex items-center justify-center bg-black bg-opacity-60 p-6`}
      >
        <article
          className={`${openModal ? "opacity-100" : "scale-0 opacity-0"} transition-all ease-out bg-white p-6 w-fit flex flex-col shadow-md rounded-md gap-4 border-2 border-primary `}
        >
          <h1 className="text-title-large-bold text-center mb-4">
            Resumen de la Financiación
          </h1>

          <div className="flex flex-col">
            <div className="flex gap-1 items-center">
              <p className="text-title-medium-bold">Cuota Mensual:</p>
              <span className="text-body-medium-regular">${loan.monthlyPayment}</span>
            </div>
            <span className="text-body-small-regular-12 font-lato">
              {`Ten en cuenta que tu sueldo neto debe ser mayor a ${loan.minimalSalary}$`}
            </span>
          </div>

          <div className="flex gap-1 items-center">
            <p className="text-title-medium-bold">Tasa de Interés:</p>
            <span className="text-body-medium-regular">{loan.interest}%</span>
          </div>

          <div className="flex gap-1 items-center">
            <p className="text-title-medium-bold">Monto a Financiar:</p>
            <span className="text-body-medium-regular">${loan.realLoan}</span>
          </div>

          <div className="flex gap-1 items-center">
            <p className="text-title-medium-bold">Pago total:</p>
            <span className="text-body-medium-regular">${loan.totalPayment}</span>
          </div>
          <div className="self-end" onClick={() => setOpenModal(false)}>
            <Button color="primary-blue" size="small" classname="mt-2">
              Cerrar
            </Button>
          </div>
        </article>
      </dialog>
    </>
  );
}

export default LoanSimulator;
