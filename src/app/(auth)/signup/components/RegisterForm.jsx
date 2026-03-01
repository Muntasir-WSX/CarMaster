import { registerUser } from "@/app/actions/auth/registerUser";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";

export default function RegisterForm() {
 const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const toastId = toast.loading("Registering user..."); 

    try {
      const res = await registerUser({ name, email, password });

      if (res.success) {
        toast.success(res.message, { id: toastId });
        form.reset(); 
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (error) {
      toast.error("An error occurred!", { id: toastId });
    }
  };
  return (
    <div className="w-full lg:w-1/2 max-w-md border rounded-xl p-10 shadow-sm">
      <h2 className="text-4xl font-bold text-center mb-10 text-neutral-800">
        Sign Up
      </h2>

      <form onSubmit={handleSignUp} className="space-y-6">
        <div className="space-y-2">
          <label className="font-semibold text-neutral-700">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="w-full p-4 border rounded-lg focus:outline-none focus:border-[#FF3811]"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="font-semibold text-neutral-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="w-full p-4 border rounded-lg focus:outline-none focus:border-[#FF3811]"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="font-semibold text-neutral-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="password"
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
           
            className="p-3 bg-gray-100 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <FaFacebookF />
          </button>
          <button
           
            className="p-3 bg-gray-100 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            <FaLinkedinIn />
          </button>
          <button
           
            className="p-3 bg-gray-100 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            <FaGoogle />
          </button>
        </div>
      </div>

      <p className="text-center mt-8 text-neutral-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#FF3811] font-bold hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
