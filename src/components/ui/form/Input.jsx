import React from "react";

const Input = React.forwardRef(({ placeholder = "", className = "", type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref} // React Hook Form ke ref ko forward karna zaroori hai
      type={type}
      placeholder={placeholder}
      className={`w-full border outline-none border-gray-300 rounded-lg p-2 ${className}`}
      {...props} // React Hook Form ke `register` se aane wale saare props ko yaha spread karna hoga
    />
  );
});

export default Input;
