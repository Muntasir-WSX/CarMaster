"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import loginImg from "../../../../public/assets/images/login/login.svg"; // আপনার ইমেজের পাথ অনুযায়ী চেক করে নিন

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Side - Illustration */}
        <div className="hidden lg:block w-1/2">
          <Image 
            src={loginImg} 
            alt="Login Illustration" 
            width={500} 
            height={500} 
            className="mx-auto"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 max-w-md border rounded-xl p-10 shadow-sm">
          <h2 className="text-4xl font-bold text-center mb-10 text-neutral-800">Login</h2>
          
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="font-semibold text-neutral-700">Email</label>
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full p-4 border rounded-lg focus:outline-none focus:border-[#FF3811]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-neutral-700">Confirm Password</label>
              <input 
                type="password" 
                placeholder="Your password" 
                className="w-full p-4 border rounded-lg focus:outline-none focus:border-[#FF3811]"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#FF3811] text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all mt-4"
            >
              Sign In
            </button>
          </form>

          {/* Social Login */}
          <div className="text-center mt-8">
            <p className="text-neutral-600 mb-6">Or Sign In with</p>
            <div className="flex justify-center gap-4">
              <button className="p-3 bg-gray-100 rounded-full text-blue-600 hover:bg-blue-50 transition-colors">
                <FaFacebookF />
              </button>
              <button className="p-3 bg-gray-100 rounded-full text-blue-500 hover:bg-blue-50 transition-colors">
                <FaLinkedinIn />
              </button>
              <button className="p-3 bg-gray-100 rounded-full text-red-500 hover:bg-red-50 transition-colors">
                <FaGoogle />
              </button>
            </div>
          </div>

          <p className="text-center mt-8 text-neutral-500">
            New to Car Doctor?{" "}
            <Link href="/signup" className="text-[#FF3811] font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}