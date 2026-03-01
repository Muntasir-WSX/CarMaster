"use client";
import Image from "next/image";
import Link from "next/link";

import NavLogo from "@/ShareComponents/NavLogo"; 
import loginImg from "../../../../public/assets/images/login/login.svg"; 
import RegisterForm from "./components/RegisterForm";

export default function SignUpPage() {


  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="container mx-auto">
        {/* Logo Section */}
        <div className="flex justify-start mb-8 lg:ml-12">
        
             <NavLogo />
          
        </div>

        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side - Illustration */}
          <div className="hidden lg:block w-1/2">
            <Image 
              src={loginImg} 
              alt="SignUp" 
              width={500} 
              height={500} 
              className="mx-auto"
              priority
            />
          </div>

          {/* Right Side - Sign Up Form */}
          <RegisterForm></RegisterForm>
  
        </div>
      </div>
    </div>
  );
}