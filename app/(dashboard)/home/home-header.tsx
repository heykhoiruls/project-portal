"use client";
import React from "react";
import { nameInitial } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { dataHomeMenu } from "@/lib/data/data-home";
import IsError from "@/app/(trouble)/isError";
import IsLoading from "@/app/(trouble)/isLoading";
import { useUserBankAccount } from "@/app/hook/useUserBankContact";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const HomeHeader = ({
  onSelected,
}: {
  onSelected?: (index: number) => void;
}) => {
  const router = useRouter();

  const handleLogout = () => {
    toast.success("Bye, bye. kamu berhasil logout");
    localStorage.removeItem("idEmployee");
    router.push("/sign-in");
  };

  const { user, error, loading } = useUserBankAccount();

  if (error) return <IsError errorMessage={error} />;
  if (loading || !user) return <IsLoading />;

  return (
    <div className="flex items-center gap-4 w-full">
      <Avatar className="w-10 h-10">
        <AvatarFallback className="font-bold">
          {nameInitial(user.name)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col text-xs flex-1 overflow-hidden">
        <CardTitle className="truncate text-md uppercase">
          {user.name}
        </CardTitle>
        <CardDescription className="truncate text-xs ">
          {user.idEmployee}
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
