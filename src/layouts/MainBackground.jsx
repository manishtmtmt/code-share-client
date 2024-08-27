import React from "react";

const MainBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#8b5cf6]">
      <div className="select-none h-[620px]">
        <img
          src="/assets/Hero-Background-notecode@2x.png"
          alt="hero-background"
          className="object-cover object-bottom w-full h-full"
        />
      </div>
      {children && (
        <div className="absolute -translate-x-[50%] left-[50%] top-2 w-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default MainBackground;
