'use client'

import { signOut } from "next-auth/react"

interface LogoutType {
  className?: string,
  children?: React.ReactNode
}

export default function Logout({ className, children }: LogoutType) {
  return (
    <button className={className} onClick={() => signOut()}>
      {children}
      Logout
    </button>
  )
}
