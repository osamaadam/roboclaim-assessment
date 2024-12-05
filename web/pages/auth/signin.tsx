import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { status } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    }
  };

  if (status === "authenticated") {
    router.replace("/");
  }

  return (
    <main className="signin__container">
      <h1>Sign In / Sign Up</h1>
      <form className="signin__container__form" onSubmit={handleSubmit}>
        <TextField
          id="username"
          label="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button variant="contained" type="submit">
          Sign In
        </Button>
      </form>
    </main>
  );
};

export default SignInPage;
