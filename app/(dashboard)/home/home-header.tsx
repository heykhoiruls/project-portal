"use client";
import React from "react";
import { redirect } from "next/navigation";
import { dataUsers } from "@/lib/data/data-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { dataHomeMenu } from "@/lib/data/data-home";

const HomeHeader = ({
  idEmployee,
  onSelected,
}: {
  idEmployee: string | null;
  onSelected?: (index: number) => void;
}) => {
  const handleLogout = () => {
    localStorage.removeItem("idEmployee");
    redirect("/");
  };

  const user = dataUsers.find((u) => u.idEmployee === idEmployee);

  return (
    <div className="flex items-center gap-4 w-full">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src="https://github.com/heykhoiruls.png"
          alt="Profile"
        />
        <AvatarFallback>KF</AvatarFallback>
      </Avatar>

      <div className="flex flex-col text-xs flex-1 overflow-hidden">
        <CardTitle className="truncate text-md md:text-lg uppercase">
          {user?.name || "Tidak ada nama"}
        </CardTitle>
        <CardDescription className="truncate text-xs pt-1">
          {idEmployee}
        </CardDescription>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-40"
        >
          {dataHomeMenu.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className="text-xs cursor-pointer"
              onClick={() => onSelected?.(index)}
            >
              {item}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-xs cursor-pointer text-red-600"
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HomeHeader;
