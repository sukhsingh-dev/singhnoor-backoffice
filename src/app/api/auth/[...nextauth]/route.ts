import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise from '../../../../../lib/mongodb'

const allowedAdmins = ['sukhjindersinghmca@gmail.com','singhnoor.web@gmail.com']

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? ""
    })
  ],
  // adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    signIn(data : any) {
      if (allowedAdmins.includes(data.user.email)) {
        return true;
      } else {
        return false
      }
    }
  }
}

export const handler = NextAuth(authOptions)

export {handler as GET, handler as POST }

