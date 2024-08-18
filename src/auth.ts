import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "../lib/mongodb";

const allowedAdmins = ['sukhjindersinghmca@gmail.com','singhnoor.web@gmail.com','singhnoorcreations@gmail.com']

export const config = {
  providers: [GoogleProvider],
  // adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ profile }) {
      if (profile?.email && allowedAdmins.includes(profile?.email)) {
        return true;
      } else {
        return '/'
      }
    }
  }
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)