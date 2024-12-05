import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { status } = useSession();
  return (
    <nav>
      <ul>
        {status === "authenticated" ? (
          <SignedInComponents />
        ) : (
          <li>
            <Link href="/auth/signin">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

function SignedInComponents() {
  return (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/insights">Insights</Link>
      </li>
      <li>
        <Link href="/files">Files</Link>
      </li>
      <li>
        <button onClick={() => signOut()}>Sign Out</button>
      </li>
    </>
  );
}
