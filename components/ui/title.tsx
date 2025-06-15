import React from "react";

const Title = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-4 px-4 pt-4">
      <h4 className="text-xl font-bold tracking-tight whitespace-nowrap">
        {title}
      </h4>
      <div className="flex-1 h-0.5 bg-gray-600 rounded-full" />
    </div>
  );
};

export default Title;
