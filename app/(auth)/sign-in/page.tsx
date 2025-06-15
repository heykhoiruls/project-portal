"use client";
import React from "react";
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
import { redirect } from "next/navigation";
import { dataUsers } from "@/lib/data/data-user";
import { messages } from "@/lib/messages";

const PageSignIn = () => {
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const idEmployee = formData.get("idEmployee");
    const password = formData.get("password");

    if (!idEmployee || !password) {
      toast.error(messages.form.required, {
        duration: 2500,
      });
      return;
    }

    const user = dataUsers.find((u) => u.idEmployee === idEmployee);

    if (!user) {
      toast.error(messages.form.userNotFound, { duration: 2500 });
      return;
    }

    if (user.password !== password) {
      toast.error(messages.form.loginErrorPassword, { duration: 2500 });
      return;
    }
    localStorage.setItem("idEmployee", String(idEmployee));
    toast.success(messages.form.loginSucces, { duration: 2500 });

    console.log("idEmployee ->", idEmployee);
    console.log("password ->", password);
    redirect("/");
  };

  return (
    <div className="w-full h-dvh flex justify-center items-baseline md:items-center pt-16 md:p-0">
      <form
        className="w-full h-3/4 max-w-xs"
        onSubmit={handleLogin}
      >
        <Card className="flex items-center justify-center border border-gray-100">
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
              silahkan masuk dengan akun anda
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full">
            <div className="grid gap-2 mb-3">
              <div>
                <Label className="text-xs font-medium px-2">
                  Nomor Karyawan
                </Label>
                <Input
                  id="idEmployee"
                  name="idEmployee"
                  type="number"
                  placeholder="Masukan nomor karyawan"
                  className="mt-2"
                />
              </div>
            </div>
            <div className="grid gap-3 mb-8">
              <div>
                <Label className="text-xs font-medium px-2">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Masukan password"
                  className="mt-2"
                />
              </div>
            </div>
            <div className="w-full">
              <Button
                type="submit"
                className="p-5 w-full cursor-pointer"
              >
                Masuk
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default PageSignIn;
