import FileDisplay from "@/components/file_display";
import { FileEntity } from "@/types/file_entity.type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Files() {
  const { data: session, status } = useSession();
  const [files, setFiles] = useState<FileEntity[]>();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    if (!session) return;
    const { jwt } = session;
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
      const requestURL = new URL("/files", API_URL);
      requestURL.searchParams.append("page", page.toString());
      requestURL.searchParams.append("pageSize", pageSize.toString());
      const response = await fetch(requestURL, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const resJson = await response.json();
      setFiles(resJson.files);
      setCount(resJson.count);
    } catch (error) {
      console.error("There was an error!", error);
    }
  }, [session, setFiles, page, pageSize]);

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
      <FileDisplay
        files={files}
        showContent
        showPagination
        page={page}
        pageSize={pageSize}
        count={count}
        setPage={setPage}
        setPageSize={setPageSize}
        fetchFiles={fetchData}
      />
    </main>
  );
}
