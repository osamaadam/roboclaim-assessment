import "next-auth";

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
    jwt: string;
  }
}
