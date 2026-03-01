"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import NavLogo from "@/ShareComponents/NavLogo"; 
import loginImg from "../../../../public/assets/images/login/login.svg"; 

export default function SignUpPage() {

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Sign Up button clicked!");
  };

  const handleSocialSignUp = (platform) => {
    console.log(`${platform} sign up clicked!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="container mx-auto">
        {/* Logo Section */}
        <div className="flex justify-start mb-8 lg:ml-12">
          <Link href="/">
             <NavLogo />
          </Link>
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
          <div className="w-full lg:w-1/2 max-w-md border rounded-xl p-10 shadow-sm">
            <h2 className="text-4xl font-bold text-center mb-10 text-neutral-800">Sign Up</h2>
            
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="space-y-2">
                <label className="font-semibold text-neutral-700">Name</label>
                <input 
                  type="text" 
                  placeholder="Your name" 
                  className="w-full p-4 border rounded-lg focus:outline-none focus:border-[#FF3811]" 
                  required 
                />
              </div>
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
                className="w-full bg-[#FF3811] text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-700 active:scale-[0.98] transition-all mt-4"
              >
                Sign Up
              </button>
            </form>

            {/* Social Login/SignUp */}
            <div className="text-center mt-8">
              <p className="text-neutral-600 mb-6">Or Sign Up with</p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => handleSocialSignUp('Facebook')}
                  className="p-3 bg-gray-100 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  <FaFacebookF />
                </button>
                <button 
                  onClick={() => handleSocialSignUp('LinkedIn')}
                  className="p-3 bg-gray-100 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
                >
                  <FaLinkedinIn />
                </button>
                <button 
                  onClick={() => handleSocialSignUp('Google')}
                  className="p-3 bg-gray-100 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  <FaGoogle />
                </button>
              </div>
            </div>

            <p className="text-center mt-8 text-neutral-500">
              Already have an account?{" "}
              <Link href="/login" className="text-[#FF3811] font-bold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}