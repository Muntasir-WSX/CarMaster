"use client";
import { useSession } from 'next-auth/react';
import React from 'react';

const UserDashboard = () => {
  const { data: session } = useSession();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">User Dashboard</h1>
      <p className="mt-4 text-lg">
        Welcome, <span className="text-[#FF3811] font-semibold">{session?.user?.name || "user"}</span>!
      </p>
      <div className="mt-6 p-4 bg-green-100 rounded-lg text-green-700 inline-block">
        Role status: <strong>{session?.user?.role}</strong>
      </div>
    </div>
  );
};

export default UserDashboard;