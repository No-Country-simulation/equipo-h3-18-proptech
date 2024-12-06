import { SVGProps } from "react"
export const TelephoneIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m14.33 15.94 1.33-1.33a2.202 2.202 0 0 1 3.13 0l1.56 1.56a2.198 2.198 0 0 1 0 3.13l-.71.72a3.3 3.3 0 0 1-3.82.63A28.93 28.93 0 0 1 3.35 8.19a3.29 3.29 0 0 1 .64-3.82l.71-.72a2.22 2.22 0 0 1 3.13 0L9.4 5.22a2.22 2.22 0 0 1 0 3.13L8.07 9.68a30.081 30.081 0 0 0 2.89 3.36c1.04 1.04 2.156 2 3.34 2.87l.03.03Z"
    />
  </svg>
)
export default TelephoneIcon