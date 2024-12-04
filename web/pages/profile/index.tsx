import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/auth/signin");
    } else {
      console.log(session);
    }
  }, [status]);

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {session?.user?.username}</p>
      <button onClick={() => signOut()}>Signout</button>
    </div>
  );
}
