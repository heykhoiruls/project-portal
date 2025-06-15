"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { attendanceData } from "@/lib/data/data-home";
import { Badge } from "@/components/ui/badge";

const UserAttandaceTable = () => {
  return (
    <div className="w-full overflow-hidden rounded-t-lg border border-gray-300 border-b-0 ">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-muted font-medium text-xs text-center">
            <TableHead className="text-center">Tanggal</TableHead>
            <TableHead className="text-center">Sektor - Regu</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {attendanceData.map((entry, index) => (
            <TableRow
              key={index}
              className="hover:bg-accent transition-colors text-center"
            >
              <TableCell className="text-center text-xs">
                {entry.date}
              </TableCell>
              <TableCell className="text-center text-xs">
                {entry.sector}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    entry.status === "Hadir"
                      ? "bg-green-100 text-green-700"
                      : entry.status === "KHL"
                      ? "bg-blue-100 text-blue-700"
                      : ["Izin", "Off", "Sakit"].includes(entry.status)
                      ? "bg-yellow-100 text-yellow-700"
                      : entry.status === "Alfa"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {entry.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserAttandaceTable;
