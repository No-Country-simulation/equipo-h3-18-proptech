import { SVGProps } from "react";
export const GraphIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={49}
    height={48}
    fill="none"
    {...props}
  >
    <path
      stroke="#3D5A80"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="m10.676 22.496 27.6-12.552m0 0L33.116 8m5.16 1.944-1.92 5.16M39.5 39.2h-6V22.4a1.2 1.2 0 0 1 1.2-1.2h3.6a1.2 1.2 0 0 1 1.2 1.2v16.8Zm-12 0h-6V26a1.2 1.2 0 0 1 1.2-1.2h3.6a1.2 1.2 0 0 1 1.2 1.2v13.2Zm-12 0h-6v-9.6a1.2 1.2 0 0 1 1.2-1.2h3.6a1.2 1.2 0 0 1 1.2 1.2v9.6Z"
    />
  </svg>
);
export default GraphIcon;
