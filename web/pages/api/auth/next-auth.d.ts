import "next-auth";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: number;
      username: string;
      createdAt: string;
      updatedAt: string;
      roles: {
        id: number;
        role: string;
      }[];
    };
  }

  /**
   * User object returned by the `authorize` callback and `getUser` function
   */
  interface User extends DefaultUser {
    user: {
      id: number;
      username: string;
      createdAt: string;
      updatedAt: string;
      roles: {
        id: number;
        role: string;
      }[];
    };
    jwt: string;
  }
}
