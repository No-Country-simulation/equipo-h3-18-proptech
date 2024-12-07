import { SVGProps } from "react"
export const ValidateUserIcon = (props: SVGProps<SVGSVGElement>) => (
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
      strokeWidth={2}
      d="M14 19.286 15.8 21l4.2-4M4 21a7 7 0 0 1 11-5.745M15 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
    />
  </svg>
)
export default ValidateUserIcon