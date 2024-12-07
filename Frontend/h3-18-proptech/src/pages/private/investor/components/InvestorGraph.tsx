import { useState } from "react";
import { SelectArrowIcon } from "../../../../components/icons";

export function InvestorGraph() {
  const [year, setYear] = useState(2024);

  return (
    <>
      <div className="flex w-[300px] bg-primary h-16 rounded-2xl py-2 px-3 justify-between items-center">
        <button className="w-12 h-12 rounded-lg bg-contrast">
          <SelectArrowIcon
            className=" rotate-90"
            onClick={() => setYear(year - 1)}
          />
        </button>
        <p className="text-title-large-bold text-contrast">{year}</p>
        <button className="w-12 h-12 rounded-lg bg-contrast">
          <SelectArrowIcon
            className=" rotate-270"
            onClick={() => setYear(year + 1)}
          />
        </button>
      </div>
      <section className="flex md:justify-between lg:justify-center gap-2 p-4 relative w-[90vw] max-w-[1050px] h-[300px] items-end mx-auto">
        <BarChart month={months[0]} value={250} maxValue={1200} />
        <BarChart month={months[1]} value={280} maxValue={1200} />
        <BarChart month={months[2]} value={350} maxValue={1200} />
        <BarChart month={months[3]} value={400} maxValue={1200} />
        <BarChart month={months[4]} value={500} maxValue={1200} />
        <BarChart month={months[5]} value={700} maxValue={1200} />
        <BarChart month={months[6]} value={600} maxValue={1200} />
        <BarChart month={months[7]} value={800} maxValue={1200} />
        <BarChart month={months[8]} value={950} maxValue={1200} />
        <BarChart month={months[9]} value={1200} maxValue={1200} />
        <BarChart month={months[10]} value={950} maxValue={1200} />
        <BarChart month={months[11]} value={1000} maxValue={1200} />
      </section>
    </>
  );
}

export default InvestorGraph;

interface Props {
  month: string;
  value: number;
  maxValue: number;
}

const BarChart = ({ month, value, maxValue }: Props) => {
  const height = (value / maxValue) * 90;
  return (
    <>
      <div
        className="bg-primaryVar1 w-[8%] rounded-lg relative"
        style={{ height: `${height}%` }}
      >
        <p className="text-body-small-regular-12 absolute -top-6 right-1/2 translate-x-1/2">
          ${value}
        </p>
        <div className="flex text-body-small-regular-12 z-10 absolute -bottom-6 right-1/2 translate-x-1/2 w-max">
          <span>{month}</span>
        </div>
      </div>
    </>
  );
};

const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];
