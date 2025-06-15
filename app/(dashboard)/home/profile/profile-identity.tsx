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
import { User, Pencil } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ProfileIdentity = () => {
  const [idForeign, setIdForeign] = useState("32102361231331");
  const [address, setAddress] = useState(
    "Jl. Raya Industri No. 123, Majalengka"
  );

  const handleUpdate = () => {
    if (!idForeign || !address) {
      toast.error("Harap lengkapi semua data.");
      return;
    }

    toast.success("Data berhasil diperbarui!");
  };

  return (
    <Dialog>
      <Alert variant="default">
        <User className="h-4 w-4" />
        <AlertTitle className="flex justify-between items-center">
          Detail
          <DialogTrigger asChild>
            <Pencil className="h-4 w-4 cursor-pointer" />
          </DialogTrigger>
        </AlertTitle>

        <AlertDescription className="text-xs pt-2">
          Nomor Kependudukan
          <div className="pt-1 text-xs font-medium">{idForeign}</div>
        </AlertDescription>
        <AlertDescription className="text-xs pt-2">
          Alamat Lengkap
          <div className="pt-1 text-xs font-medium">{address}</div>
        </AlertDescription>
      </Alert>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ubah Detail</DialogTitle>
          <DialogDescription className="text-xs">
            Silakan perbarui informasi data diri kamu di bawah ini.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-1">
            <Label
              htmlFor="idForeign"
              className="text-xs font-medium px-2 pb-2"
            >
              Nomor Kependudukan
            </Label>
            <Input
              id="idForeign"
              type="text"
              placeholder="Masukkan Nomor Kependudukan"
              value={idForeign}
              onChange={(e) => setIdForeign(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label
              htmlFor="address"
              className="text-xs font-medium px-2 pb-2"
            >
              Alamat Lengkap
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="Masukkan Alamat Lengkap"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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

export default ProfileIdentity;
