"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { messages } from "@/lib/messages";
import { useRouter } from "next/navigation";

const PageSignIn = () => {
  const [idEmployee, setIdEmployee] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    if (!idEmployee || !password) {
      toast.error(messages.signIn.required);
      return;
    }

    if (idEmployee.length < 9) {
      toast.warning(messages.signIn.userNotFound);
      return;
    }

    setIsLoading(true);

    try {
      await toast.promise(
        (async () => {
          const res = await fetch("/api/auth/sign-in", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idEmployee, password }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.message);

          localStorage.setItem("idEmployee", idEmployee);
          return data.message;
        })(),
        {
          loading: messages.loading,
          success: (msg) => msg || messages.signIn.success,
          error: (err) => err.message || messages.signIn.passwordError,
        }
      );

      setTimeout(() => {
        router.push("/");
      }, 2500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-dvh flex justify-center items-baseline md:items-center pt-20 md:p-0">
      <form
        onSubmit={handleLogin}
        className="w-full h-3/4 max-w-xs"
      >
        <Card className="flex items-center justify-center border border-gray-100 px-2 md:px-0">
          <CardHeader className="gap-1 px-8 py-4 w-full flex items-center flex-col">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={160}
              height={80}
              className="mb-5"
              priority
            />
            <CardTitle className="text-xl">Selamat datang</CardTitle>
            <CardDescription className="text-xs">
              Silakan masuk dengan akun anda
            </CardDescription>
          </CardHeader>

          <CardContent className="w-full">
            <div className="grid mb-3">
              <Label
                htmlFor="idEmployee"
                className="text-xs font-medium px-2"
              >
                Nomor Karyawan
              </Label>
              <Input
                id="idEmployee"
                name="idEmployee"
                type="text"
                inputMode="numeric"
                pattern="\d*"
                placeholder="Masukan Nomor Karyawan"
                value={idEmployee}
                maxLength={9}
                className="text-xs placeholder:text-xs"
                onChange={(e) =>
                  setIdEmployee(e.target.value.replace(/\D/g, ""))
                }
              />
            </div>

            <div className="grid mb-12">
              <Label
                htmlFor="password"
                className="text-xs font-medium px-2"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Masukkan password"
                className="mt-2 text-xs placeholder:text-xs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="p-5 w-full"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Masuk"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default PageSignIn;
