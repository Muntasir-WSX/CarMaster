import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NavLogo({ width = 60, height = 40, textColor = "text-black" }) {
  return (
    <Link href="/" className="flex flex-col items-center"> 
      <Image
        src="/assets/navlogo.png" 
        width={width}
        height={height}
        alt="Car Master Logo"
        priority 
        className="object-contain"
        style={{ width: 'auto', height: 'auto' }} 
      />
      <h1 className={`mt-1 text-lg font-bold tracking-tight ${textColor}`}>
        Car Master
      </h1>
    </Link>
  );
}