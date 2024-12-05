import FileDisplay from "@/components/file_display";
import { FileEntity } from "@/types/file_entity.type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Files() {
  const { data: session, status } = useSession();
  const [files, setFiles] = useState<FileEntity[]>();
  const router = useRouter();

  const fetchData = useCallback(async () => {
    if (!session) return;
    const { jwt } = session;
    try {
      const response = await fetch("http://localhost:4000/files", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const resJson = await response.json();
      setFiles(resJson);
    } catch (error) {
      console.error("There was an error!", error);
    }
  }, [session, setFiles]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated") {
      fetchData();
    }
  }, [status, router, fetchData]);

  if (!files) return <p>Loading...</p>;

  return (
    <main>
      <FileDisplay files={files} showContent />
    </main>
  );
}
