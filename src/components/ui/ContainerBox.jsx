import React from "react";
import cn from "../../utils/cn";

const ContainerBox = ({ children, className, fluid = false }) => {
  return (
    <div className={cn(fluid ? "w-full" : "container mx-auto px-3", className)}>
      {children}
    </div>
  );
};

export default ContainerBox;
