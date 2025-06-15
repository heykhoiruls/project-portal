import React from "react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  BicepsFlexedIcon,
  Factory,
  FactoryIcon,
  SwordsIcon,
} from "lucide-react";
import JobSkill from "./job-skill";
import JobTool from "./job-tool";
import JobDepartement from "./job-departement";

const UserJob = () => {
  

  return (
    <div className="w-full py-5 gap-3 flex flex-col">
      <JobDepartement />
      <JobSkill />
      <JobTool />
      
      
    </div>
  );
};

export default UserJob;
