"use client";

import React, { useEffect, useState } from "react";
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
import { useUserBankAccount } from "@/app/hook/useUserBankContact";
import IsLoading from "@/app/(trouble)/isLoading";
import IsError from "@/app/(trouble)/isError";
import { toast } from "sonner";
import { messages } from "@/lib/messages";

const UserBankAccount = () => {
  const { user, error, loading, mutate, updateUserData } = useUserBankAccount();
  const [bankAccount, setBankAccount] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (user) {
      setBankAccount(user.Bank?.bankAccount || "");
    }
  }, [user]);

  if (error) return <IsError errorMessage={error} />;
  if (loading || !user) return <IsLoading />;

  const userBankAccount = user.Bank?.bankAccount || messages.bank.hasNo;
  const userEmail = user.Contact?.email || "";

  const handleUpdate = async () => {
    if (!bankAccount || !user.idEmployee) return;

    if (bankAccount.length !== 13) {
      toast.warning(messages.bank.wrong);
      return;
    }

    setSaving(true);
    const success = await updateUserData(user.idEmployee, bankAccount);
    setSaving(false);

    if (success) {
      toast.success(messages.bank.success);
      setBankAccount("");
      mutate();
    } else {
      toast.error(messages.bank.failSave);
    }
  };

  return (
    <Dialog>
      <div className="py-4 w-full">
        <div className="relative h-[200px] bg-gradient-to-br from-black to-red-600 text-white rounded-xl shadow-xl p-6 mx-auto overflow-hidden">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

          <div className="flex flex-col justify-between h-full relative z-10">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-md font-bold tracking-wider">
                  BANK MANDIRI
                </h2>
                <p className="text-sm tracking-widest font-mono">
                  {userBankAccount}
                </p>
                <p className="text-xs">{userEmail}</p>
              </div>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                >
                  <PencilIcon className="w-4 h-4" />
                </Button>
              </DialogTrigger>
            </div>
            <div>
              <p className="text-xs text-white/90">atas nama</p>
              <p className="text-md font-bold uppercase">{user.name}</p>
            </div>
          </div>
        </div>

        {user.Bank?.bankAccount ? (
          <p className="text-xs text-center italic pt-4 px-5 text-muted-foreground">
            Nomor rekening akan digunakan untuk penggajian, dan slip gaji akan
            dikirim melalui email sesuai data yang tertera.
          </p>
        ) : (
          <p className="text-xs text-center italic pt-4 px-5 text-red-500">
            Segera buat rekening Mandiri di kantor terdekat atau daftar melalui
            aplikasi Livin’ by Mandiri.
          </p>
        )}

        {!user.Contact?.email && (
          <p className="text-xs text-center italic pt-2 px-5 text-red-500">
            Email belum diisi. Mohon lengkapi agar slip gaji bisa dikirim dengan
            benar.
          </p>
        )}
      </div>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold">Ubah Rekening</DialogTitle>
          <DialogDescription className="text-xs">
            Harap masukkan nomor{" "}
            <span className="font-semibold">rekening mandiri</span> atas nama
            pribadi.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-1">
            <Label
              htmlFor="bankAccount"
              className="text-xs font-medium px-2"
            >
              Nomor Rekening
            </Label>
            <Input
              id="bankAccount"
              type="text"
              inputMode="numeric"
              pattern="\d*"
              minLength={13}
              maxLength={13}
              value={bankAccount}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setBankAccount(value);
                }
              }}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleUpdate}
              disabled={saving || !bankAccount}
            >
              {saving ? "Menyimpan" : "Perbarui"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserBankAccount;
