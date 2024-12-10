import { SVGProps } from "react"
export const EyeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="m21.335 11.407.933-.36-.933.36Zm0 1.186-.933-.36.933.36Zm-18.67-1.186-.933-.36.933.36Zm0 1.186-.933.36.933-.36Zm.933-.827A9.004 9.004 0 0 1 12 6V4C7.316 4 3.319 6.927 1.732 11.047l1.866.72ZM12 6a9.004 9.004 0 0 1 8.402 5.766l1.866-.719C20.681 6.927 16.683 4 12 4v2Zm8.402 6.234A9.004 9.004 0 0 1 12 18v2c4.683 0 8.681-2.927 10.268-7.047l-1.866-.72ZM12 18a9.004 9.004 0 0 1-8.402-5.766l-1.866.719C3.319 17.073 7.316 20 12 20v-2Zm8.402-6.234a.65.65 0 0 1 0 .468l1.866.719a2.65 2.65 0 0 0 0-1.906l-1.866.72Zm-18.67-.719a2.651 2.651 0 0 0 0 1.906l1.866-.72a.65.65 0 0 1 0-.467l-1.866-.719Z"
    />
    <circle
      cx={12}
      cy={12}
      r={3}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
)
export default EyeIcon
