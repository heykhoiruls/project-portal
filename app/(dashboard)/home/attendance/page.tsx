"use client";
import { Separator } from "@/components/ui/separator";
import React from "react";
import UserAttandaceTable from "./attendance-table";
import { attendanceData } from "@/lib/data/data-home";

const UserAttandance = () => {
  const count = {
    Hadir: 0,
    Off: 0,
    KHL: 0,
    Alfa: 0,
  };

  attendanceData.forEach((entry) => {
    if (entry.status === "Hadir") {
      count.Hadir += 1;
    } else if (["Sakit", "Izin", "Off", "Libur"].includes(entry.status)) {
      count["Off"] += 1;
    } else if (entry.status === "KHL") {
      count.KHL += 1;
    } else if (entry.status === "Alfa") {
      count.Alfa += 1;
    }
  });

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center space-y-2 pt-4 pb-4">
        <div className="flex w-full justify-center">
          <div className="flex h-5 space-x-4 text-center text-xs items-center justify-center">
            <div>{count.Hadir}x Hadir</div>
            <Separator orientation="vertical" />
            <div>{count["Off"]}x Off</div>
            <Separator orientation="vertical" />
            <div>{count.KHL}x KHL</div>
            <Separator orientation="vertical" />
            <div>{count.Alfa}x Alfa</div>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground italic">
          off adalah akumulasi dari libur, sakit, dan izin
        </div>
      </div>
      <UserAttandaceTable />
    </>
  );
};

export default UserAttandance;
