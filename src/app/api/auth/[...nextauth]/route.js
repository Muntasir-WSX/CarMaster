import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginUser } from "@/app/actions/auth/loginUser"; // ইমপোর্ট নিশ্চিত করুন
 import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import dbConnect, { collectionsName } from "@/lib/dbConnect";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await loginUser(credentials);
        
        if (user) {
          return user; 
        }
        
        return null; 
      }
    }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })
],

 callbacks: {
    async signIn({ user, account }) {
      
      if (account.provider === "google") {
        const { name, email, image } = user;
        try {
          const userCollection = await dbConnect(collectionsName.usersCollection);
        
          const userExists = await userCollection.findOne({ email });

          if (!userExists) {
          
            await userCollection.insertOne({
              name,
              email,
              image,
              role: "user", 
              provider: account.provider,
            });
          }
          return true; 
        } catch (error) {
          console.error("Error saving google user:", error);
          return false; 
        }
      }
    
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET, 
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }