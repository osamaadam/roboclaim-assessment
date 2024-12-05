import InsightsTable from "@/components/insights_table";
import type { Insights } from "@/types/insights.type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Insights() {
  const { data: session, status } = useSession();
  const [insights, setInsights] = useState<Insights[]>();
  const router = useRouter();

  const fetchData = useCallback(async () => {
    if (!session) return;
    const { jwt } = session;
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
      const requestURL = new URL("/files/insights", API_URL);
      const response = await fetch(requestURL, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const resJson = await response.json();
      setInsights(resJson);
    } catch (error) {
      console.error("There was an error!", error);
    }
  }, [session, setInsights]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated") {
      fetchData();
    }
  }, [status, router, fetchData]);

  if (!insights) return <p>Loading...</p>;

  return (
    <main>
      <InsightsTable insights={insights} />
    </main>
  );
}
