
import * as React from "react"
import { SVGProps } from "react"
const AnsibleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Ansible"
    viewBox="0 0 512 512"
    {...props}
  >
    <rect width={512} height={512} fill="#fff" rx="15%" />
    <circle cx={256} cy={256} r={217} fill="#1A1918" />
    <path
      fill="#FFF"
      d="m259.7 171.4 56.2 138.9-85-67 28.8-72zm100 170.9L273 133.9a14 14 0 0 0-13.4-9.2c-6 0-11.3 3.2-13.8 9.2l-95 228.6h32.5l37.6-94.3L333.2 359c4.5 3.7 7.8 5.3 12 5.3 8.5 0 16-6.3 16-15.5 0-1.5-.6-3.9-1.6-6.4z"
    />
  </svg>
)
export default AnsibleIcon
