import React from "react";

const Container = ({ children }) => {
  return (
    <div className="mx-auto p-10 bg-white">
      {children}
    </div>
  );
};

export default Container;
