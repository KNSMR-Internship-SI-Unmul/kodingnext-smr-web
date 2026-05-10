import React from "react";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-secondary-pink rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary-pink rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}
