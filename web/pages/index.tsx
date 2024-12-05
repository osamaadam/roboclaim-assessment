import FileDisplay from "@/components/file_display";
import { FileEntity } from "@/types/file_entity.type";
import { CloudUpload } from "@mui/icons-material";
import { Alert, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileEntity[]>([]);
  const [resMsg, setResMsg] = useState("");

  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [router, status]);

  const handleFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const formData = new FormData();
    for (const file of Array.from(files)) {
      formData.append("files", file);
    }

    setIsLoading(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
    const requestURL = new URL("/upload", API_URL);
    const res = await fetch(requestURL, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${session?.jwt}`,
      },
    });

    if (res.ok) {
      const {
        files,
        message,
      }: {
        files: FileEntity[];
        message: string;
      } = await res.json();

      setUploadedFiles(files);
      setResMsg(message);
    } else {
      alert("Failed to upload file");
    }
    setIsLoading(false);
  };

  return (
    <main>
      <p>Welcome, {session?.user?.username}</p>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUpload />}
      >
        Upload files
        <input
          type="file"
          onChange={handleFilesUpload}
          multiple
          disabled={isLoading}
          accept="image/jpeg, image/png, application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/csv"
        />
      </Button>
      {uploadedFiles.length > 0 ? (
        <>
          <Alert severity="success">{resMsg}</Alert>
          <FileDisplay files={uploadedFiles} />
        </>
      ) : null}
    </main>
  );
}
