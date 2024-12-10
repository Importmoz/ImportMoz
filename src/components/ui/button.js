import React from "react";

export const Button = ({
  children,
  variant = "default",
  className,
  ...props
}) => {
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    solid: "bg-green-500 text-white hover:bg-green-600",
  };

  return (
    <button
      className={`px-4 py-2 rounded-md ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
