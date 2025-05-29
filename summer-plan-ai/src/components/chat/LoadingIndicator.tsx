import React from "react";

export default function LoadingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-current rounded-full opacity-60 animate-thinking-1"></div>
      <div className="w-2 h-2 bg-current rounded-full opacity-60 animate-thinking-2"></div>
      <div className="w-2 h-2 bg-current rounded-full opacity-60 animate-thinking-3"></div>
    </div>
  );
}
