import { SVGProps } from "react";
export const InvestStatusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    width={800}
    height={800}
    data-name="Layer 1"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M2.43 16.76h3.83v5.74H2.43zM17.74 9.11h3.83V22.5h-3.83zM10.09 12.93h3.83v9.57h-3.83zM.52 22.5h22.96M9.13 8.15h3.35a1.43 1.43 0 0 0 1.43-1.43 1.43 1.43 0 0 0-1.43-1.44h-1a1.43 1.43 0 0 1-1.43-1.43 1.44 1.44 0 0 1 1.43-1.44h3.35M12 .5v1.91M12 8.15v1.92"
      fill={"none"}
      stroke={"currentColor"}
      strokeMiterlimit={10}
      strokeWidth={"1.91px"}
    />
  </svg>
);
export default InvestStatusIcon;
