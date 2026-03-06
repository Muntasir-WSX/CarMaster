"use client";
import { useSession, signOut } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { HiOutlineHome, HiOutlineCalendar, HiOutlineViewGrid, HiOutlineLogout, HiMenuAlt2, HiOutlineShoppingBag } from "react-icons/hi";
import NavLogo from '@/ShareComponents/NavLogo';
import { PiPlus } from 'react-icons/pi';
import Image from 'next/image';
import bannerimg from "../../../public/assets/images/homeCarousel/4.jpg";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") return (
    <div className="flex justify-center items-center h-screen bg-white">
      <span className="loading loading-spinner loading-lg text-[#FF3811]"></span>
    </div>
  );
  
  if (!session) redirect('/login');

  const isAdmin = session?.user?.role === "admin";

  const menuItems = isAdmin ? [
    { title: "Dashboard Overview", path: "/admin", icon: <HiOutlineHome size={22} /> },
    { title: "All Appointments", path: "/admin/all-appointments", icon: <HiOutlineCalendar size={22} /> },
    { title: "All Bookings", path: "/admin/all-bookings", icon: <HiOutlineViewGrid size={22} /> },
    { title: "Manage Services", path: "/admin/manage-services", icon: <HiOutlineViewGrid size={22} /> },
    { title: "Add Service", path: "/admin/add-service", icon: <PiPlus size={22} /> },
  ] : [
    { title: "Dashboard Overview", path: "/user", icon: <HiOutlineHome size={22} /> },
    { title: "My Journey Log", path: "/user/my-bookings", icon: <HiOutlineShoppingBag size={22} /> },
    { title: "Service Echoes", path: "/user/appointments", icon: <HiOutlineCalendar size={22} /> },
  ];

  const currentPage = menuItems.find(item => item.path === pathname)?.title || "Dashboard";

  return (
    <div className="drawer lg:drawer-open bg-[#F8F9FA] min-h-screen">
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col">
        <header className="navbar bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-30 lg:hidden">
          <div className="flex-1">
            <label htmlFor="main-drawer" className="btn btn-ghost drawer-button mr-2">
              <HiMenuAlt2 size={24} />
            </label>
            <h1 className="text-xl font-bold text-gray-800">{currentPage}</h1>
          </div>
        </header>
        <div className="relative h-48 md:h-64 w-full overflow-hidden shadow-md">
          <Image src={bannerimg} alt="Banner" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold">{currentPage}</h1>
            <p className="mt-2 opacity-80 text-sm md:text-base">Home - {currentPage}</p>
          </div>
        </div>
        <main className="p-4 md:p-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[60vh]">
            {children}
          </div>
        </main>
      </div>
      <div className="drawer-side z-40">
        <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu p-6 w-80 min-h-full bg-white border-r border-gray-100 flex flex-col">
          <div className="mb-10 text-center lg:text-left">
            <NavLogo />
          </div>

          <ul className="flex-1 space-y-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Main Menu</p>
            {menuItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <li key={index}>
                  <Link href={item.path} 
                    className={`flex items-center gap-4 py-3.5 px-4 rounded-xl transition-all duration-300 ${
                      isActive ? "bg-[#FF3811] text-white shadow-lg shadow-orange-100" : "text-gray-500 hover:bg-orange-50"
                    }`}>
                    {item.icon}
                    <span className="font-semibold">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <button onClick={() => signOut({ callbackUrl: '/' })} 
              className="btn btn-outline border-[#FF3811] text-[#FF3811] hover:bg-[#FF3811] hover:text-white w-full rounded-xl gap-2 h-auto py-3">
              <HiOutlineLogout size={20} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}