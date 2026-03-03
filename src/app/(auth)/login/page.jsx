"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import NavLogo from "@/ShareComponents/NavLogo";
import loginImg from "../../../../public/assets/images/login/login.svg";
import LoginForm from "./components/loginform";

export default function LoginPage({ params }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // params থেকে id পাওয়ার জন্য await করা হয়েছে
      const p = await params; 
      if (!p?.id) return;

      try {
        const res = await fetch(`http://localhost:3000/api/service/${p.id}`);
        
        if (!res.ok) {
           throw new Error("Failed to fetch service data");
        }
        
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="container mx-auto">
        {/* Logo Section - আপনার আগের স্টাইল অনুযায়ী */}
        <div className="flex justify-start mb-8 lg:ml-12">
            <NavLogo />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side - Illustration (আগের মতোই) */}
          <div className="hidden lg:block w-1/2">
            <Image 
              src={loginImg} 
              alt="Login Illustration" 
              width={500} 
              height={500} 
              className="mx-auto"
              priority
            />
          </div>

          {/* Right Side - Login Form (আপনার অরিজিনাল UI স্টাইল বজায় রাখা হয়েছে) */}
          <LoginForm data={data} />

        </div>
      </div>
    </div>
  );
}