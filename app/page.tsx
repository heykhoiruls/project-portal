"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageHome from "./(dashboard)/home/page";

export default function Home() {
  const [idEmployee, setIdEmployee] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedId = localStorage.getItem("idEmployee");

    if (storedId) {
      setIdEmployee(storedId);
    } else {
      router.push("/sign-in");
    }
  }, [router]);

  if (!idEmployee) {
    return null; // atau tampilkan spinner
  }

  return <PageHome />;
}
