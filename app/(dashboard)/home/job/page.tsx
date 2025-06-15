import React from "react";
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
