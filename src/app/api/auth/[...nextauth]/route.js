import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginUser } from "@/app/actions/auth/loginUser"; // ইমপোর্ট নিশ্চিত করুন

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
          return user; // ইউজার পেলে অবজেক্ট রিটার্ন করবে
        }
        
        return null; // পাসওয়ার্ড ভুল হলে বা ইউজার না থাকলে null
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET, // এনভায়রনমেন্ট ফাইল থেকে সিক্রেট দিন
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }