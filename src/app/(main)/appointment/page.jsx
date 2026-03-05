"use client";
export const dynamic = "force-dynamic";
import { useSession } from 'next-auth/react';
import React from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AppointmentPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const appointmentData = {
      name: session?.user?.name || "Anonymous",
      email: session?.user?.email,
      phone: form.phone.value,
      address: form.address.value,
      problem: form.problem.value,
      homeVisit: form.homeVisit.checked,
      status: 'pending',
      createdAt: new Date()
    };

    const res = await fetch('/api/appointment', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(appointmentData)
    });

    if (res.ok) {
      toast.success("Appointment request sent!");
      form.reset();
      router.push('/my-bookings'); 
    } else {
      toast.error("Failed to send request.");
    }
  };

  return (
    <div className="container mx-auto p-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <input type="text" value={session?.user?.name} readOnly className="w-full p-4 border rounded mb-4 bg-gray-100" />
        <input 
  type="email" 
  value={session?.user?.email || ''} 
  readOnly 
  className="w-full p-4 border rounded mb-4 bg-gray-100" 
/>
        <input name="phone" type="tel" required placeholder="Phone Number" className="w-full p-4 border rounded mb-4" />
        <input name="address" type="text" required placeholder="Your Address" className="w-full p-4 border rounded mb-4" />
        <textarea name="problem" required className="w-full p-4 border rounded mb-4" placeholder="Describe your car problem..." />
        
        <label className="flex items-center gap-2 mb-6 cursor-pointer">
          <input type="checkbox" name="homeVisit" className="checkbox checkbox-primary" />
          <span className="font-semibold">Request a home visit for inspection</span>
        </label>
        
        <button type="submit" className="w-full bg-[#FF3811] text-white py-4 rounded-lg font-bold">Send Request</button>
      </form>
    </div>
  );
}