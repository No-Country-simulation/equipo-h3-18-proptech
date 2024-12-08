import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, NumberInput } from "../../../components/common";
import { FormValues, investmentSimulatorSchema } from "../models";
import { useSessionStore } from "../../../stores";
// import { useModalStore } from "../../stores/modal/modal.store";

/*   
  interest: number; // Interes mensual
  investment: number; // Monto a invertir
  months: number; // Cantidad de meses de inversión
  earnings: number; // Ganancias por interes
  total: number; // Ganancias totales (investment + earnings)
*/

const interest: number = 0.01531;

export function InvestmentSimulator() {
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
  const session = useSessionStore(state => state.session)

  const onSubmit: SubmitHandler<FormValues> = ({ investment }) => {
    const calculeEarnings = (NMonths: number) => {
      return parseFloat(
        (((1 + interest) ** NMonths - 1) * investment).toFixed(2)
      );
    };

    setTotals([
      calculeEarnings(3),
      calculeEarnings(6),
      calculeEarnings(9),
      calculeEarnings(12),
    ]);

    setGrafh(true);
  };
  return (
    <>
      <section className="flex flex-col md:flex-row items-center md:justify-between lg:justify-center gap-4 md:gap-8 lg:gap-24 w-full bg-tertiary py-10 md:py-20 px-6 relative">
        <aside className="flex flex-col basis-1/4 md:basis-2/5 lg:basis-1/4">
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
            to={session ? "/investor" : "/register"}
            classname="hidden md:flex"
          >
            Invertir
          </Button>
        </aside>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 sm:pt-5 basis-[490px]"
        >
          <section className="flex flex-col sm:flex-row items-center justify-around">
            <NumberInput
              label="Inversión"
              name="investment"
              register={register}
              error={errors.investment}
            />
            <Button
              type="submit"
              color="primary-blue"
              size="small"
              classname="mt-1"
            >
              Calcular
            </Button>
          </section>

          <section className="flex flex-row h-[240px] gap-4 items-end relative mx-auto">
            <BarChart
              trigger={grafh}
              months={3}
              value={totals[0]}
              maxValue={totals[3]}
            />
            <BarChart
              trigger={grafh}
              months={6}
              value={totals[1]}
              maxValue={totals[3]}
            />
            <BarChart
              trigger={grafh}
              months={9}
              value={totals[2]}
              maxValue={totals[3]}
            />
            <BarChart
              trigger={grafh}
              months={12}
              value={totals[3]}
              maxValue={totals[3]}
            />
          </section>
          <div className="h-8">
            {grafh && (
              <p className="text-title-medium-semi-bold text-center">
                Rendimientos estimados de acuerdo al plazo de inversión
              </p>
            )}
          </div>
          <Button
            color="primary-orange"
            size="large"
            type="link"
            to={session ? "/investor" : "/register"}
            classname="flex self-center mt-4 md:hidden"
          >
            Invertir
          </Button>
        </form>
      </section>
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
        className={`${trigger ? `bg-primaryVar1` : " bg-transparent"} w-14 sm:w-24 h-1 transform ease-in-out origin-bottom duration-500 rounded-lg`}
        style={trigger ? { height: `${height}%` } : {}}
      >
        <p
          className={`${trigger ? "" : " opacity-0"} text-body-medium-regular  transform ease-in-out duration-500 absolute top-[-30px] right-1/2 translate-x-1/2`}
        >
          ${value}
        </p>
        <div
          className={`${trigger ? "" : " opacity-0"} flex flex-col md:flex-row items-center gap-x-1 text-contrast text-title-small-bold transform ease-in-out duration-500 z-10 absolute bottom-0 right-1/2 translate-x-1/2 w-max`}
        >
          <span>{months}</span>
          <span>meses</span>
        </div>
      </div>
    </>
  );
};
