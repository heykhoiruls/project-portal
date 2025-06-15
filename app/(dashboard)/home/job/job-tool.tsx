import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
import { Pencil, SwordsIcon } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

const sizeShoes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
const sizeSuits = ["S", "M", "L", "XL", "2XL", "3XL", "Apron"];

const JobTool = () => {
  const [sizeShoe, setSizeShoe] = useState("35");
  const [sizeSuit, setSizeSuit] = useState("Apron");

  const handleUpdate = () => {
    if (!sizeShoe || !sizeSuit) {
      toast.error("Harap lengkapi semua data alat kerja.");
      return;
    }

    toast.success("Data alat kerja berhasil diperbarui!");
  };
  return (
    <Dialog>
      <Alert variant="default">
        <SwordsIcon className="h-4 w-4" />
        <AlertTitle className="flex justify-between items-center">
          Alat Kerja
          <DialogTrigger asChild>
            <Pencil
              onClick={() => {}}
              className="h-4 w-4 cursor-pointer"
            />
          </DialogTrigger>
        </AlertTitle>

        <AlertDescription className="text-xs pt-2">
          {sizeSuit === "Apron" ? (
            <p>
              Kamu menggunakan <strong>Apron</strong>
            </p>
          ) : sizeSuit ? (
            <p>
              Kamu menggunakan Seragam ukuran <strong>{sizeSuit}</strong>
            </p>
          ) : (
            <p>Kamu belum memilih Alat Kerja</p>
          )}
          <div className="flex flex-wrap gap-1 pt-2">
            <Badge className="text-xs capitalize w-2 h-2 bg-green-600"></Badge>
            <Badge className="text-xs capitalize w-2 h-2 bg-blue-600"></Badge>
            <Badge className="text-xs capitalize w-2 h-2 bg-orange-600"></Badge>
          </div>
        </AlertDescription>
        <AlertDescription className="text-xs pt-2">
          Sepatu kamu ukuran {sizeShoe}
          <div className="flex flex-wrap gap-1 pt-2">
            <Badge className="text-xs capitalize w-2 h-2"></Badge>
            <Badge className="text-xs capitalize w-2 h-2 bg-red-800"></Badge>
          </div>
        </AlertDescription>
      </Alert>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ubah Alat Kerja</DialogTitle>
          <DialogDescription className="text-xs">
            Silakan perbarui informasi alat kerja kamu di bawah ini.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-1">
            <Label
              htmlFor="account"
              className="text-xs font-medium px-2 pb-2"
            >
              Alat Pelindung Diri
            </Label>
            <Select
              value={sizeSuit}
              onValueChange={setSizeSuit}
            >
              <SelectTrigger
                id="sizeSuit"
                className="w-full"
              >
                <SelectValue placeholder="Pilih ukuran" />
              </SelectTrigger>
              <SelectContent>
                {sizeSuits.map((size) => (
                  <SelectItem
                    key={size}
                    value={size}
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1">
            <Label
              htmlFor="account"
              className="text-xs font-medium px-2 pb-2"
            >
              Ukuran Sepatu
            </Label>
            <Select
              value={sizeShoe}
              onValueChange={setSizeShoe}
            >
              <SelectTrigger
                id="sizeShoe"
                className="w-full"
              >
                <SelectValue placeholder="Pilih ukuran" />
              </SelectTrigger>
              <SelectContent>
                {sizeShoes.map((size) => (
                  <SelectItem
                    key={size}
                    value={size}
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

export default JobTool;
