import React from "react";

const isError = ({ errorMessage }: { errorMessage: string }) => {
  return <div>{errorMessage}</div>;
};

export default isError;
