"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2'; 
import ServiceBanner from '../services/[id]/ServiceBanner';

export default function MyBookings() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (session?.user?.email) {
        const res = await fetch(`/api/bookings?email=${session?.user?.email}`);
        const data = await res.json();
        setBookings(data);
      }
    };
    fetchBookings();
  }, [session]);
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF3811",
      cancelButtonColor: "#444444",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`/api/bookings?id=${id}`, {
          method: 'DELETE'
        });
        
        if (res.ok) {
          Swal.fire({
            title: "Deleted!",
            text: "Your booking has been removed.",
            icon: "success",
            confirmButtonColor: "#FF3811",
          });
          const remaining = bookings.filter(booking => booking._id !== id);
          setBookings(remaining);
        } else {
          Swal.fire("Error!", "Failed to delete.", "error");
        }
      }
    });
  };

  // কার্ট ক্লিয়ার করার ফাংশন
  const handleClearCart = () => {
    Swal.fire({
      title: "Clear all items?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#444444",
      confirmButtonText: "Yes, clear all!"
    }).then((result) => {
      if (result.isConfirmed) {
        setBookings([]);
        Swal.fire("Cleared!", "Your cart is now empty.", "success");
      }
    });
  };

  return (
    <div className="container mx-auto px-4 mb-20 mt-10">
      <ServiceBanner title="Cart Details" />

      <div className="mt-12 overflow-x-auto">
        <table className="table w-full border-separate border-spacing-y-4">
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="bg-white shadow-sm rounded-lg border border-gray-100">
                <th className="p-4">
                  <button 
                    onClick={() => handleDelete(booking._id)}
                    className="btn btn-circle btn-sm bg-[#444444] text-white hover:bg-red-600 border-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </th>

                <td className="p-4">
                  <div className="flex items-center gap-6">
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-gray-100">
                      <Image 
                        src={booking.serviceImg} 
                        alt={booking.serviceTitle} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div>
                      <div className="font-bold text-xl text-[#444444]">{booking.serviceTitle}</div>
                      <p className="text-sm text-gray-400 mt-1">Address: {booking.address}</p>
                      <p className="text-sm text-gray-400">Phone: {booking.phone}</p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                    <span className="font-semibold text-xl text-[#444444]">${booking.price}</span>
                </td>

                <td className="p-4 text-lg font-medium text-[#444444]">
                    {booking.date}
                </td>

                <td className="p-4">
                  <button className={`btn btn-md px-6 rounded-lg text-white font-semibold border-none ${booking.status === 'pending' ? 'bg-[#FF3811]' : 'bg-green-600'}`}>
                    {booking.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-10 px-4">
            <button className="flex items-center gap-2 text-gray-600 font-medium hover:text-[#FF3811]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Continue Shopping
            </button>
            <button 
                onClick={handleClearCart}
                className="flex items-center gap-2 text-gray-600 font-medium hover:text-red-600"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                Clear Shopping Cart
            </button>
        </div>
      </div>
    </div>
  );
}