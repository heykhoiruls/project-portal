"use client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
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
import { Label } from "@/components/ui/label";
import { Contact, Pencil } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ProfileContact = () => {
  const [email, setEmail] = useState("kotaksuratkhoirul@gmail.com");
  const [phone, setPhone] = useState("0858-5976-8956");

  const handleUpdate = () => {
    if (!email || !phone) {
      toast.error("Harap lengkapi semua data kontak.");
      return;
    }

    toast.success("Data kontak berhasil diperbarui!");
    // Tambahkan request ke backend jika ingin menyimpan
  };

  return (
    <Dialog>
      <Alert variant="default">
        <Contact className="h-4 w-4" />
        <AlertTitle className="flex justify-between items-center">
          Kontak
          <DialogTrigger asChild>
            <Pencil className="h-4 w-4 cursor-pointer" />
          </DialogTrigger>
        </AlertTitle>

        <AlertDescription className="text-xs pt-2">
          Email
          <div className="pt-1 text-xs font-medium">{email}</div>
        </AlertDescription>
        <AlertDescription className="text-xs pt-2">
          Nomor Telepon
          <div className="pt-1 text-xs font-medium">{phone}</div>
        </AlertDescription>
      </Alert>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ubah Kontak</DialogTitle>
          <DialogDescription className="text-xs">
            Silakan perbarui informasi kontak kamu di bawah ini.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-1">
            <Label
              htmlFor="email"
              className="text-xs font-medium px-2 pb-2"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Masukan Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label
              htmlFor="phone"
              className="text-xs font-medium px-2 pb-2"
            >
              Nomor Telepon
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Masukan Nomor Telpon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

export default ProfileContact;
