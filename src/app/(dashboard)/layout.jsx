"use client";
import { useSession, signOut } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { HiOutlineHome, HiOutlineCalendar, HiOutlineViewGrid, HiOutlineLogout, HiMenuAlt2 } from "react-icons/hi";
import NavLogo from '@/ShareComponents/NavLogo';

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <span className="loading loading-spinner loading-lg text-[#FF3811]"></span>
      </div>
    );
  }

  if (!session || session?.user?.role !== "admin") {
    redirect('/');
  }

  const menuItems = [
    { title: "Dashboard Overview", path: "/admin", icon: <HiOutlineHome size={22} /> },
    { title: "All Appointments", path: "/admin/all-appointments", icon: <HiOutlineCalendar size={22} /> },
    { title: "All Bookings", path: "/admin/all-bookings", icon: <HiOutlineViewGrid size={22} /> },
    { title: "Manage Services", path: "/admin/manage-services", icon: <HiOutlineViewGrid size={22} /> },
  ];
  

  return (
    <div className="drawer lg:drawer-open bg-[#F8F9FA]">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <header className="navbar bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-30">
          <div className="flex-1">
            <label htmlFor="admin-drawer" className="btn btn-ghost drawer-button lg:hidden mr-2">
              <HiMenuAlt2 size={24} />
            </label>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {menuItems.find(item => item.path === pathname)?.title || "Admin Panel"}
              </h1>
              <p className="text-xs text-gray-500 hidden md:block">Welcome back, {session?.user?.name.split(' ')[0]}!</p>
            </div>
          </div>
        </header>
        <main className="p-6 min-h-[calc(100-80px)]">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[70vh] p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
      <div className="drawer-side z-40">
        <label htmlFor="admin-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        
        <div className="menu p-6 w-80 min-h-full bg-white border-r border-gray-100 text-gray-700 flex flex-col">
          <div className="mb-10 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-6">
              <NavLogo />
            </div>
            <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3 border border-gray-100">
               <div className="avatar">
                  <div className="w-12 rounded-full ring ring-[#FF3811] ring-offset-base-100 ring-offset-2">
                    <img src={session?.user?.image || "https://i.ibb.co.com/mR7099X/user.png"} alt="admin" />
                  </div>
               </div>
               <div className="overflow-hidden">
                  <h4 className="font-bold text-gray-900 truncate text-sm">{session?.user?.name}</h4>
                  <div className="badge badge-success badge-sm text-[10px] text-white font-bold uppercase tracking-tighter py-2">
                    {session?.user?.role}
                  </div>
               </div>
            </div>
          </div>
          <ul className="flex-1 space-y-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Main Menu</p>
            {menuItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <li key={index}>
                  <Link 
                    href={item.path} 
                    className={`flex items-center gap-4 py-3.5 px-4 rounded-xl transition-all duration-300 group ${
                      isActive 
                      ? "bg-[#FF3811] text-white shadow-lg shadow-orange-100" 
                      : "hover:bg-orange-50 hover:text-[#FF3811] text-gray-500"
                    }`}
                  >
                    <span className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-[#FF3811]"}`}>
                      {item.icon}
                    </span>
                    <span className="font-semibold">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto pt-6 border-t border-gray-100">
             <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="btn btn-sm sm:btn-md bg-white text-gray-700 border-[#FF3811] hover:text-white hover:bg-[#FF3811] w-full rounded-xl py-3 px-4 h-auto"
              >
                <HiOutlineLogout size={22} />
                <span className="font-bold">Logout </span>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}