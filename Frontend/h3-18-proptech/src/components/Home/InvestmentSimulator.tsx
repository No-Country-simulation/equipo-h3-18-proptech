import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useModalStore } from "../../stores/modal/modal.store";
import { Button, NumberInput } from "../common";
import {
  FormValues,
  investmentSimulatorSchema,
} from "./models/InvestmentSimulator.model";
import { useState } from "react";

/*   
  interest: number; // Interes mensual
  investment: number; // Monto a invertir
  months: number; // Cantidad de meses de inversión
  earnings: number; // Ganancias por interes
  total: number; // Ganancias totales (investment + earnings)
*/

const interest: number = 0.01531;

function InvestmentSimulator() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { investment: 1000, months: 6 },
    resolver: zodResolver(investmentSimulatorSchema),
  });

  const [grafh, setGrafh] = useState(false);
  const [totals, setTotals] = useState<number[]>([]);

  //const showModal = useModalStore((state) => state.showModal);

  const onSubmit: SubmitHandler<FormValues> = ({ investment, months }) => {
    console.log({ investment, months });

    const calculeEarnings = (NMonths: number) => {
      return parseFloat(
        (((1 + interest) ** NMonths - 1) * investment).toFixed(2)
      );
    };

    // const calculeTotal = (NMonths: number) => {
    //   return investment + calculeEarnings(NMonths);
    // };

    //const earnings: number = calculeEarnings(months);
    //const total: number = calculeTotal(months);

    setTotals([
      calculeEarnings(3),
      calculeEarnings(6),
      calculeEarnings(9),
      calculeEarnings(12),
    ]);

    setGrafh(true);

    // showModal({
    //   title: "Ganancias",
    //   content: [
    //     {
    //       label: "Inversión inicial",
    //       value: `$${investment}`,
    //     },
    //     {
    //       label: `Capitalización en ${months} meses`,
    //       value: `$${earnings}`,
    //     },
    //     {
    //       label: "Capital total",
    //       value: `$${total}`,
    //     },
    //   ],
    //   buttonLink: "/register",
    //   buttonTitle: "Invertir",
    // });
  };
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 lg:gap-24 w-full bg-tertiary py-10 md:py-20 px-6 relative">
        <aside className="flex flex-col basis-1/4">
          <h3 className="text-headline-medium-medium mb-8">
            Calcula las ganancias de tu inversión
          </h3>
          <p className="text-title-large-regular max-w-[36ch] mb-7">
            Nuestro{" "}
            <span className="text-title-large-semi-bold">
              Simulador de Inversión
            </span>{" "}
            te permite conocer los beneficios obtenidos de invertir en
            Financia.ai.
          </p>
          <p className="text-title-large-regular max-w-[36ch] mb-7">
            Ingresa el monto a invertir y el número de meses de capitalización,
            y obtén una estimación clara de tus ganancias.
          </p>
          <Button
            color="primary-orange"
            size="large"
            type="link"
            to="/register"
            classname="hidden md:flex"
          >
            Invertir
          </Button>
        </aside>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 pt-5 basis-[490px]"
        >
          <div className="flex items-center justify-around">
            <NumberInput
              label="Inversión"
              name="investment"
              register={register}
              error={errors.investment}
            />
            {/* <SelectInput
            register={register}
            name="months"
            label={`Meses de capitalización (interes mensual: %${(interest * 100).toFixed(2)})`}
            options={[
              6, 9, 12, 18, 24, 30, 36, 48, 60, 72, 84, 96, 120, 150, 180,
            ].map((month) => ({
              value: month,
              label: `${month} meses`,
            }))}
          /> */}
            <Button
              type="submit"
              color="primary-blue"
              size="small"
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
            Invertir
          </Button>
          <div className="flex h-[250px] relative">
            <div className="relative">
              <BarChart
                trigger={grafh}
                months={3}
                value={totals[0]}
                maxValue={totals[3]}
              />
            </div>
            <div className="relative left-32">
              <BarChart
                trigger={grafh}
                months={6}
                value={totals[1]}
                maxValue={totals[3]}
              />
            </div>
            <div className="relative left-64">
              <BarChart
                trigger={grafh}
                months={9}
                value={totals[2]}
                maxValue={totals[3]}
              />
            </div>
            <div className="relative left-96">
              <BarChart
                trigger={grafh}
                months={12}
                value={totals[3]}
                maxValue={totals[3]}
              />
            </div>
            {grafh && (
              <p className="text-title-medium-semi-bold absolute bottom-[-30px] right-1/2 translate-x-1/2 w-max">
                Rendimientos estimados de acuerdo al plazo de inversión
              </p>
            )}
          </div>
        </form>
      </section>
      {/* Lo siguiente falta por diseño*/}
    </>
  );
}

export default InvestmentSimulator;

interface Props {
  trigger: boolean;
  months: number;
  value: number;
  maxValue: number;
}

const BarChart = ({ trigger, months, value, maxValue }: Props) => {
  const height = (value / maxValue) * 80;
  return (
    <>
      <div
        className={`${trigger ? `bg-primaryVar1` : " bg-transparent"} w-24 h-1 transform ease-in-out origin-bottom duration-500 absolute bottom-0 rounded-lg`}
        style={trigger ? { height: `${height}%` } : {}}
      >
        <p
          className={`${trigger ? "" : " opacity-0"} text-body-medium-regular  transform ease-in-out duration-500 absolute top-[-30px] right-1/2 translate-x-1/2`}
        >
          ${value}
        </p>
        <p
          className={`${trigger ? "" : " opacity-0"} text-contrast text-title-small-bold transform ease-in-out duration-500 z-10 absolute bottom-0 right-1/2 translate-x-1/2 w-max`}
        >
          {months} meses
        </p>
      </div>
    </>
  );
};
