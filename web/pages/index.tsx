import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status]);

  const handleFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const formData = new FormData();
    for (const file of Array.from(files)) {
      formData.append("files", file);
    }

    const res = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${session?.jwt}`,
      },
    });

    if (res.ok) {
      alert("File uploaded successfully");
    } else {
      alert("Failed to upload file");
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome, {session?.user?.username}</p>
      <input
        type="file"
        accept="image/jpeg, image/png, application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/csv"
        multiple
        onChange={handleFilesUpload}
      />
    </div>
  );
}
