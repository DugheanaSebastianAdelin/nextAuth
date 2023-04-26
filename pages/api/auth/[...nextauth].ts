import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";



export const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email:{ label:"Email", type:"email",placeholder:"test@yahoo.com"},
        password:{label:"Password", type:"password"},
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

      
        const user = await prisma.user.findUnique({
            where: {
              email: email
            }
          })
  
          if (!user) {
            throw new Error("invalid credentials");
          }

          if(password !== user.password){
            throw new Error("wrong password");
          }


        // if everything is fine
        return {
            id: user.id,
            email: user.email,
        };
      },
      
    }),

],
pages: {
    signIn: "/auth/signin",
 },  

  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
