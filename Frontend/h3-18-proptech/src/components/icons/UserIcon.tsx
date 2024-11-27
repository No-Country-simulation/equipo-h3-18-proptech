import { SVGProps } from "react"
export const UserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={12} cy={10} r={3} fill="currentColor" />
    <circle cx={12} cy={12} r={9} stroke="currentColor" strokeWidth={1.2} />
    <path
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.2}
      d="M17.872 18.808a.227.227 0 0 0 .073-.257c-.376-1-1.132-1.88-2.164-2.518C14.697 15.363 13.367 15 12 15s-2.697.363-3.781 1.033c-1.032.638-1.788 1.519-2.164 2.518a.227.227 0 0 0 .073.257 9.407 9.407 0 0 0 11.744 0Z"
    />
  </svg>
)
export default UserIcon