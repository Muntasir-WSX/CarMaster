import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  // মেনু আইটেমগুলোকে একটি অ্যারে হিসেবে রাখা ভালো, এতে মেইনটেইন করা সহজ হয়
  const navItems = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Blog", path: "/blog" },
    { title: "Contact", path: "/contact" },
  ];

  const menuItems = (
    <>
      {navItems.map((item, index) => (
        <li key={index}>
          <Link href={item.path} className="font-semibold hover:text-primary">
            {item.title}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-10">
      {/* Navbar Start: Logo & Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {menuItems}
          </ul>
        </div>
        <Link href="/" className="flex items-center">
          <Image 
            src="/assets/logo.svg" 
            width={100} 
            height={60} 
            alt="CarMaster Logo" 
            priority
          />
        </Link>
      </div>

      {/* Navbar Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {menuItems}
        </ul>
      </div>

      {/* Navbar End: Action Button */}
      <div className="navbar-end">
        <button className="btn btn-outline btn-primary px-6 rounded-md">
          Appointment
        </button>
      </div>
    </div>
  );
}