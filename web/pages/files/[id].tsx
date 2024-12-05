import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import FileDisplay from "../../components/file_display";
import { FileEntity } from "../../types/file_entity.type";
import { TextField } from "@mui/material";

export default function File() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [file, setFile] = useState<FileEntity>();

  const fetchFile = useCallback(async () => {
    const { id } = router.query;
    if (!session) return;
    const { jwt } = session;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
      const requestURL = new URL(`/files/${id}`, API_URL);
      const response = await fetch(requestURL, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const resJson = await response.json();
      setFile(resJson);
    } catch (error) {
      console.error("There was an error!", error);
    }
  }, [session, router.query]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else {
      fetchFile();
    }
  }, [status, router, fetchFile]);

  if (!file) {
    return <p>Loading...</p>;
  }

  return (
    <main className="file__container">
      <FileDisplay files={[file]} />
      <TextField
        label="Content"
        multiline
        value={file.content}
        fullWidth
        disabled
      />
    </main>
  );
}
