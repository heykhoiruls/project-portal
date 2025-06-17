import { useEffect, useState } from "react";

type User = {
  name: string;
  idEmployee: string;
  Contact?: { email?: string; phone?: string };
  Bank?: { bankAccount?: string };
};

export const useUserBankAccount = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const userFetch = async () => {
    const idEmployee = localStorage.getItem("idEmployee");
    if (!idEmployee) {
      setError("Karyawan tidak ditemukan.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idEmployee }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal mengambil data user");
      }

      const data = await res.json();
      setUser(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan tak dikenal");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userFetch();
  }, []);

  const updateUserData = async (
    idEmployee: string,
    bankAccount?: string,
    email?: string,
    phone?: string
  ) => {
    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idEmployee, bankAccount, email, phone }),
      });

      if (!res.ok) throw new Error("Gagal memperbarui rekening");

      await userFetch();
      return true;
    } catch (error) {
      console.error("Update gagal:", error);
      return false;
    }
  };

  return {
    user,
    error,
    loading,
    mutate: userFetch,
    updateUserData,
  };
};
