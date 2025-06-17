"use client";
import React, { useEffect, useState } from "react";
import IsError from "@/app/(trouble)/isError";
import IsLoading from "@/app/(trouble)/isLoading";
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
import { Input } from "@/components/ui/input";
import { useUserBankAccount } from "@/app/hook/useUserBankContact";
import ContactNotice from "./profile-notice";
import { toast } from "sonner";
import { messages } from "@/lib/messages";

const ProfileContact = () => {
  const { user, error, loading, mutate, updateUserData } = useUserBankAccount();
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.Contact?.email || "");
      setPhone(user.Contact?.phone || "");
    }
  }, [user]);

  if (error) return <IsError errorMessage={error} />;
  if (loading || !user) return <IsLoading />;

  const handleUpdate = async () => {
    if (!user.idEmployee) return;
    if (!email && !phone) {
      toast.warning(messages.contact.hasNo);
      return;
    }

    const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (email && email !== email.toLowerCase()) {
      toast.error(messages.contact.hasLowercase);
      return;
    }

    if (email && !regexEmail.test(email)) {
      toast.error(messages.contact.wrongEmail);
      return;
    }

    const regexPhone = /^08[0-9]{10,12}$/;

    if (phone) {
      if (!phone.startsWith("08")) {
        toast.error(messages.contact.wrongPhoneFirst);
        return;
      }

      if (!regexPhone.test(phone)) {
        toast.error(messages.contact.wrongPhoneLength);
        return;
      }
    }

    setSaving(true);
    const success = await updateUserData(
      user.idEmployee,
      user.Bank?.bankAccount || "",
      email,
      phone
    );
    setSaving(false);

    if (success) {
      toast.success(messages.contact.success);
      mutate();
    } else {
      toast.error(messages.contact.failSave);
    }
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
          <div className="pt-1 text-xs font-medium">
            {user.Contact?.email || "hmm, kamu belum email"}
          </div>
        </AlertDescription>
        <AlertDescription className="text-xs pt-2">
          Nomor Telepon
          <div className="pt-1 text-xs font-medium">
            {user.Contact?.phone || "isi dulu nomor hape kamu ya !"}
          </div>
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
              className="text-xs font-medium px-2"
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
              className="text-xs font-medium px-2"
            >
              Nomor Telepon
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Masukan Nomor Telpon"
              value={phone}
              maxLength={14}
              onChange={(e) => {
                const input = e.target.value.replace(/\D/g, "");
                if (input.length <= 14) {
                  setPhone(input);
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
              disabled={saving || !email || !phone}
            >
              {saving ? "Menyimpan" : "Perbarui"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>

      {user.Contact && (
        <ContactNotice
          email={user.Contact.email}
          phone={user.Contact.phone}
        />
      )}
    </Dialog>
  );
};

export default ProfileContact;
