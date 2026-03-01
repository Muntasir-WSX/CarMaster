"use client";
import Image from "next/image";
import Link from "next/link";
import NavLogo from "@/ShareComponents/NavLogo";
import loginImg from "../../../../public/assets/images/login/login.svg";
import LoginForm from "./components/loginform";

export default function LoginPage() {
  


  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="container mx-auto">
        {/* Logo Section */}
        <div className="flex justify-start mb-8 lg:ml-12">
            <NavLogo />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side - Illustration */}
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

          {/* Right Side - Login Form */}
          <LoginForm></LoginForm>

        </div>
      </div>
    </div>
  );
}