import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./db";
import { compare } from "bcryptjs";
import { loginSchema } from "./validation";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const validCred = loginSchema.safeParse(credentials);

        if (!validCred.success) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: validCred.data.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          validCred.data.password,
          user.password
        );

        if (isPasswordValid) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) return true;
      return false;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
};
