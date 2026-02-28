"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HiOutlineShoppingBag, HiOutlineSearch } from "react-icons/hi";
import NavLogo from "./NavLogo";

export default function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Blog", path: "/blog" },
    { title: "Contact", path: "/contact" },
  ];

  // Login/SignUp links (Reusable)
  const authLinks = (
    <div className="flex items-center gap-1 font-semibold">
      <Link 
        href="/login" 
        className={`${pathname === '/login' ? "text-[#FF3811]" : "hover:text-[#FF3811]"} transition-colors`}
      >
        Login
      </Link>
      <span className="text-gray-400">/</span>
      <Link 
        href="/signup" 
        className={`${pathname === '/signup' ? "text-[#FF3811]" : "hover:text-[#FF3811]"} transition-colors`}
      >
        SignUp
      </Link>
    </div>
  );

  const menuItems = (
    <>
      {navItems.map((item, index) => {
        const isActive = pathname === item.path;
        return (
          <li key={index}>
            <Link
              href={item.path}
              className={`font-semibold transition-colors duration-300 ${
                isActive ? "text-[#FF3811]" : "hover:text-[#FF3811]"
              }`}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </>
  );

  return (
    <div className="sticky top-0 drawer z-50">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-100 shadow-sm px-4 md:px-10 py-4">
          <div className="navbar-start">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            <NavLogo />
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2">
              {menuItems}
            </ul>
          </div>

          <div className="navbar-end gap-3 md:gap-5">
            {/* Desktop Auth Links (Hidden on mobile) */}
            <div className="hidden md:block">
               {authLinks}
            </div>

            <div className="flex items-center gap-3">
               <HiOutlineShoppingBag size={24} className="cursor-pointer hover:text-[#FF3811]" />
               <HiOutlineSearch size={24} className="cursor-pointer hover:text-[#FF3811]" />
            </div>
            
            <button className="btn btn-outline border-[#FF3811] text-[#FF3811] hover:bg-[#FF3811] hover:border-[#FF3811] hover:text-white px-6 rounded-md hidden sm:flex">
              Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar / Drawer Side */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-6 space-y-4">
          <div className="mb-4">
            <NavLogo />
          </div>
          {menuItems}
          <div className="divider"></div>
          {/* Mobile Auth Links inside Sidebar */}
          <div className="pl-4">
            {authLinks}
          </div>
          <div className="mt-4 px-4">
             <button className="btn btn-outline border-[#FF3811] text-[#FF3811] w-full">Appointment</button>
          </div>
        </ul>
      </div>
    </div>
  );
}