import { SVGProps } from "react"
export const GreenCheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={49}
    height={49}
    fill="none"
    {...props}
  >
    <path
      fill="#2ECC71"
      fillRule="evenodd"
      d="M24.7 43.473a19.2 19.2 0 1 0 0-38.399 19.2 19.2 0 0 0 0 38.4Zm-.495-11.434 10.667-12.8-3.277-2.731-9.173 11.006-4.747-4.749-3.017 3.017 6.4 6.4 1.652 1.65 1.495-1.793Z"
      clipRule="evenodd"
    />
  </svg>
)
export default GreenCheckIcon