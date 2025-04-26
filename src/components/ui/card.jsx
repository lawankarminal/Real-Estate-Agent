import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md m-0 p-0 rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className }) => {
  return <div className={`p-2 ${className}`}>{children}</div>;
};
