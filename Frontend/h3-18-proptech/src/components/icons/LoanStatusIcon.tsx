import { SVGProps } from "react";
export const LoanStatusIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M9.14 8.18h3.34a1.43 1.43 0 0 0 1.43-1.43 1.43 1.43 0 0 0-1.43-1.43h-1a1.43 1.43 0 0 1-1.43-1.43 1.44 1.44 0 0 1 1.43-1.44h3.34M12 .55v1.9M12 8.18v1.91"
      fill={"none"}
      stroke={"currentColor"}
      strokeMiterlimit={10}
      strokeWidth={"1.91px"}
    />
    <circle
      cx={17.73}
      cy={14.86}
      r={2.86}
      fill={"none"}
      stroke={"currentColor"}
      strokeMiterlimit={10}
      strokeWidth={"1.91px"}
    />
    <path
      d="M13 23.45v-.95a4.77 4.77 0 0 1 4.78-4.77 4.77 4.77 0 0 1 4.72 4.77v.95"
      fill={"none"}
      stroke={"currentColor"}
      strokeMiterlimit={10}
      strokeWidth={"1.91px"}
    />
    <circle
      cx={6.27}
      cy={14.86}
      r={2.86}
      fill={"none"}
      stroke={"currentColor"}
      strokeMiterlimit={10}
      strokeWidth={"1.91px"}
    />
    <path
      d="M1.5 23.45v-.95a4.77 4.77 0 0 1 4.77-4.77 4.77 4.77 0 0 1 4.78 4.77v.95"
      fill={"none"}
      stroke={"currentColor"}
      strokeMiterlimit={10}
      strokeWidth={"1.91px"}
    />
  </svg>
);
export default LoanStatusIcon;
