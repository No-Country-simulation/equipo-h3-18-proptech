import { SVGProps } from "react"
export const CircleProgressIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <path
      fill="#3D5A80"
      d="M24.2 5a19.2 19.2 0 1 0 19.2 19.2A19.221 19.221 0 0 0 24.2 5Zm0 35.657a16.457 16.457 0 1 1 0-32.914V24.2l11.631 11.631A16.403 16.403 0 0 1 24.2 40.657Z"
    />
  </svg>
)
export default CircleProgressIcon