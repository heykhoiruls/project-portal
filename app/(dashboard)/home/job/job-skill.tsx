"use client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { BicepsFlexedIcon } from "lucide-react";
import React from "react";

const JobSkill = () => {
  const skills = ["lakban"];

  const skillMessage = () => {
    const count = skills.length;
    if (count === 0) {
      return "Yah belum punya skill nih, yuk mulai belajar biar jago di sektor !";
    } else if (count === 1) {
      return "Hmm baru punya 1 skill, belajar posisi lain biar makin menyala !";
    } else if (count === 2) {
      return "Dua skill udah keren sih, tapi jangan berhenti belajar posisi lain yaa ! ";
    } else {
      return `Wihhh, kamu udah punya ${count} skill! Keren banget !`;
    }
  };
  return (
    <div>
      <Alert variant="default">
        <BicepsFlexedIcon className="h-4 w-4" />
        <AlertTitle>Keahlian</AlertTitle>
        <AlertDescription className="text-xs pt-2">
          {skillMessage()}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="text-xs capitalize"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default JobSkill;
