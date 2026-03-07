"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2"; 
import CarLoader from "@/ShareComponents/CarLoader";

export default function MyBookingsPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    if (session?.user?.email) {
      fetch(`/api/bookings?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [session?.user?.email]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF3811",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`/api/bookings?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          Swal.fire("Cancelled!", "Your booking has been removed.", "success");
          fetchBookings(); 
        }
      }
    });
  };

  if (loading)
    return (
      <CarLoader></CarLoader>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Journey Log</h2>

      {bookings.length > 0 ? (
        <div className="overflow-x-auto space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex flex-col md:flex-row items-center justify-between bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all gap-4"
            >
              <div className="flex items-center gap-4 w-full md:w-1/3">
                <div className="relative h-20 w-24 shrink-0">
                  <Image
                    src={booking.serviceImg}
                    alt={booking.serviceTitle}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {booking.serviceTitle}
                  </h3>
                  <p className="text-sm text-gray-500">{booking.date}</p>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-start w-full md:w-1/4">
                <span className="font-bold text-[#FF3811] text-lg">
                  ${booking.price}
                </span>
                <span className="text-xs text-gray-400">{booking.email}</span>
              </div>
              <div className="flex items-center gap-6">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize ${
                    booking.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {booking.status}
                </span>

                {booking.status === "pending" ? (
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors rounded-full border border-gray-100"
                    title="Cancel Booking"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                ) : (
                  <div
                    className="p-2 text-gray-300"
                    title="Cannot cancel approved bookings"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-2xl border border-dashed">
          No bookings found. Start your journey by booking a service!
        </div>
      )}
    </div>
  );
}
