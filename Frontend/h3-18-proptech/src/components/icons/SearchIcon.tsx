import { SVGProps } from "react"
export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    viewBox="0 0 24 25"
    {...props}
  >
    <path
      fill="currentColor"
      d="m19.6 21.073-6.3-6.3a6.096 6.096 0 0 1-3.8 1.3c-1.817 0-3.354-.629-4.612-1.888C3.63 12.927 3.001 11.39 3 9.573c0-1.816.629-3.353 1.888-4.612C6.148 3.703 7.685 3.073 9.5 3.073s3.353.63 4.613 1.888c1.26 1.26 1.889 2.796 1.887 4.612a6.096 6.096 0 0 1-1.3 3.8l6.3 6.3-1.4 1.4Zm-10.1-7c1.25 0 2.313-.437 3.188-1.312.875-.874 1.313-1.937 1.312-3.188 0-1.25-.438-2.313-1.312-3.187-.874-.874-1.937-1.311-3.188-1.313-1.251 0-2.314.437-3.187 1.313C5.44 7.263 5.002 8.326 5 9.573c-.002 1.248.436 2.311 1.313 3.188.877.878 1.94 1.315 3.187 1.312Z"
    />
  </svg>
)
export default SearchIcon