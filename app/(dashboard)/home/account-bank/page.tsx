"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PencilIcon } from "lucide-react";

const UserBankAccount = () => {
  const [accountNumber, setAccountNumber] = useState("1350021204977");

  const handleUpdate = () => {
    console.log("Updated Bank Info:", { accountNumber });
  };

  return (
    <Dialog>
      <div className="py-4 w-full">
        <div className="relative h-[200px] bg-gradient-to-br from-black to-red-600 text-white rounded-xl shadow-xl p-6 mx-auto overflow-hidden">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

          <div className="flex flex-col justify-between h-full z-10 relative">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-md font-bold tracking-wider">
                  BANK MANDIRI
                </h2>
                <p className="text-sm tracking-widest font-mono">
                  {accountNumber}
                </p>
                <p className="text-[8px]">khoirul@gmail.com</p>
              </div>
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  size="icon"
                >
                  <PencilIcon className="w-4 h-4" />
                </Button>
              </DialogTrigger>
            </div>
            <div>
              <p className="text-xs text-white/90">atas nama</p>
              <p className="text-md font-bold">MUHAMAD KHOIRUL FAHMI</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-center italic pt-4 px-5 text-muted-foreground">
          Nomor rekening akan digunakan untuk penggajian. Kesalahan input
          menjadi tanggung jawab pemilik akun.
        </p>
      </div>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-bold">Ubah Rekening</DialogTitle>
          <DialogDescription className="text-xs">
            harap masukkan nomor{" "}
            <span className="font-semibold">rekening mandiri</span> atas nama
            pribadi.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-1">
            <Label
              htmlFor="account"
              className="text-xs font-medium px-2"
            >
              Nomor Rekening
            </Label>
            <Input
              id="account"
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleUpdate}
            >
              Ubah
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserBankAccount;
