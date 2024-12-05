import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const API_URL = process.env.API_URL;
        const authURL = new URL("/auth/register", API_URL);
        const response = await fetch(authURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          const error = new Error("Invalid credentials");
          error.status = response.status;
          throw error;
        }

        const { user, token: jwt } = await response.json();

        return {
          user,
          jwt,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.jwt) {
        token.jwt = user.jwt;
        token.user = user.user;
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.jwt) {
        session.user = token.user;
        session.jwt = token.jwt;
      }

      return session;
    },
  },
});
