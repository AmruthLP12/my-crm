// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string;
  }

  interface Session {
    user?: {
      id: string;
      name: string;
      email: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
  }
}
