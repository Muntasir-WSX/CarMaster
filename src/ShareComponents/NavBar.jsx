"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HiOutlineShoppingBag, HiOutlineSearch } from "react-icons/hi";
import NavLogo from "./NavLogo";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function NavBar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const role = session?.user?.role;

  const dashboardPath = session?.user?.role === "admin" ? "/admin" : "/my-bookings";

  const navItems = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    ...(role !== "admin" ? [{ title: "Services", path: "/services" }] : []),
    { title: "Blog", path: "/blog" },
    { title: "Contact", path: "/contact" },
    ...(status === "authenticated" ? [{ title: "Dashboard", path: dashboardPath }] : []),
  ];

  const authLinks = (
    <div className="flex items-center gap-4 font-semibold">
      {status === "authenticated" ? (
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-[#FF3811] ring-offset-base-100 ring-offset-2">
              <Image
                src={session?.user?.image || "/default-avatar.png"}
                alt="User profile"
                width={40}
                height={40}
              />
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="btn btn-sm btn-ghost hover:text-[#FF3811] normal-case"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1">
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
      )}
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
            <div className="hidden md:block">
              {authLinks}
            </div>

            <div className="flex items-center gap-3">
              <Link href={dashboardPath}>
                <HiOutlineShoppingBag
                  size={24}
                  className="cursor-pointer hover:text-[#FF3811] transition-colors"
                />
              </Link>
              <HiOutlineSearch
                size={24}
                className="cursor-pointer hover:text-[#FF3811]"
              />
            </div>

            {role !== "admin" && (
  <Link href="/appointment">
    <button className="btn btn-sm sm:btn-md bg-[#FF3811] border-[#FF3811] text-white hover:bg-orange-700 transition-all">
      Appointment
    </button>
  </Link>
)}
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
          <div className="pl-4">
            {authLinks}
          </div>
          <div className="mt-4 px-4">
            <Link href="/appointment">
              <button className="btn btn-outline border-[#FF3811] text-[#FF3811] w-full">Appointment</button>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
}