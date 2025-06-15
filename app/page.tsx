"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import PageHome from "./(dashboard)/home/page";

export default function Home() {
  const [idEmployee, setIdEmployee] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("idEmployee");

    if (storedId) {
      setIdEmployee(storedId);
    } else {
      redirect("/sign-in");
    }
  });

  if (!idEmployee) {
    return null;
  }

  return <PageHome />;
}
