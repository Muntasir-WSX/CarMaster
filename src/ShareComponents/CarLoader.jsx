"use client";
import React from 'react';
import { FaCarSide } from 'react-icons/fa';

const CarLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 w-full bg-transparent">
      <div className="relative">
        <div className="text-[#FF3811] text-6xl animate-bounce">
          <FaCarSide className="animate-[move_1.5s_ease-in-out_infinite]" />
        </div>
        <div className="w-20 h-1 bg-gray-200 rounded-full -mt-2.5 overflow-hidden relative">
          <div className="absolute inset-0 bg-[#FF3811] w-1/2 animate-[road_1s_linear_infinite]"></div>
        </div>
      </div>
      <h2 className="mt-4 text-lg font-bold text-gray-700 tracking-widest uppercase">
        Tuning <span className="text-[#FF3811] animate-pulse">Your Journey...</span>
      </h2>

      <style jsx>{`
        @keyframes road {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes move {
          0%, 100% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default CarLoader;