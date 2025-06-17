import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const isLoading = () => {
  return <Skeleton className="h-5 w-3/4 mx-auto" />;
};

export default isLoading;
