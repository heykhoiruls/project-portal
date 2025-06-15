"use client"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FactoryIcon } from "lucide-react";
import React from "react";

const JobDepartement = () => {
  return (
    <div>
      <Alert variant="default">
        <FactoryIcon className="h-4 w-4" />
        <AlertTitle>Departemen</AlertTitle>
        <AlertDescription className="text-xs pt-2">
          <p>
            {" "}
            Kamu ditempatkan di{" "}
            <span className="font-semibold">Sektor 1 - Regu 2</span> dengan
            koordinator <span className="font-semibold">Fahmi</span>
          </p>
        </AlertDescription>
        <AlertDescription className="text-xs pt-2 font-bold underline cursor-pointer">
          <a
            target="_blank"
            rel="noopener noreferrer"
          >
            join grup whatsApp
          </a>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default JobDepartement;
