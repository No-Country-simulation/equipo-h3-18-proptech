import { SVGProps } from "react"
export const UploadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M10 40h28v-4H10v4Zm0-20h8v12h12V20h8L24 6 10 20Z" />
  </svg>
)
export default UploadIcon