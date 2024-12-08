interface Props {
  month: string;
  value: number;
  maxValue: number;
}

export const GraphBar = ({ month, value, maxValue }: Props) => {
  const height = (value / maxValue) * 90;
  return (
    <>
      <div
        className="bg-primaryVar1 w-[8%] rounded-lg relative transition-all"
        style={{ height: `${height}%` }}
      >
        <p className="text-body-small-regular-12 absolute -top-6 right-1/2 translate-x-1/2 transition-all">
          ${value}
        </p>
        <div className="flex text-body-small-regular-12 z-10 absolute -bottom-6 right-1/2 translate-x-1/2 w-max transition-all">
          <span>{month}</span>
        </div>
      </div>
    </>
  );
};

export default GraphBar;
