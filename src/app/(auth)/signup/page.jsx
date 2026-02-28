"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import loginImg from "../../../../public/assets/images/login/login.svg"; 

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="hidden lg:block w-1/2">
          <Image src={loginImg} alt="SignUp" width={500} height={500} className="mx-auto"/>
        </div>

        <div className="w-full lg:w-1/2 max-w-md border rounded-xl p-10 shadow-sm">
          <h2 className="text-4xl font-bold text-center mb-10 text-neutral-800">Sign Up</h2>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="font-semibold text-neutral-700">Name</label>
              <input type="text" placeholder="Your name" className="w-full p-4 border rounded-lg focus:border-[#FF3811] outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="font-semibold text-neutral-700">Email</label>
              <input type="email" placeholder="Your email" className="w-full p-4 border rounded-lg focus:border-[#FF3811] outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="font-semibold text-neutral-700">Confirm Password</label>
              <input type="password" placeholder="Your password" className="w-full p-4 border rounded-lg focus:border-[#FF3811] outline-none" required />
            </div>
            <button type="submit" className="w-full bg-[#FF3811] text-white py-4 rounded-lg font-bold text-lg mt-4">Sign Up</button>
          </form>

          <p className="text-center mt-8 text-neutral-500">
            Already have an account? <Link href="/login" className="text-[#FF3811] font-bold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}