'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from "next/navigation";

export default function SignIn() {
  const { data: session } = useSession();

  if (session) {
    redirect('/dashboard')
  }

  return <button className="btn btn-primary" onClick={() => signIn('google')}>Sign in with Google</button>

}
