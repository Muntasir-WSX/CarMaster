"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import ServiceBanner from "../services/[id]/ServiceBanner";

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
          method: "DELETE",
        });

        if (res.ok) {
          Swal.fire({
            title: "Deleted!",
            text: "Your booking has been removed.",
            icon: "success",
            confirmButtonColor: "#FF3811",
          });
          const remaining = bookings.filter((booking) => booking._id !== id);
          setBookings(remaining);
        } else {
          Swal.fire("Error!", "Failed to delete.", "error");
        }
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
              <tr
                key={booking._id}
                className="bg-white shadow-sm rounded-lg border border-gray-100"
              >
                <th className="p-4">
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="btn btn-circle btn-sm bg-[#444444] text-white hover:bg-red-600 border-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
                      <div className="font-bold text-xl text-[#444444]">
                        {booking.serviceTitle}
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        Address: {booking.address}
                      </p>
                      <p className="text-sm text-gray-400">
                        Phone: {booking.phone}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <span className="font-semibold text-xl text-[#444444]">
                    ${booking.price}
                  </span>
                </td>

                <td className="p-4 text-lg font-medium text-[#444444]">
                  {booking.date}
                </td>

                <td className="p-4">
                  <button
                    className={`btn btn-md px-6 rounded-lg text-white font-semibold border-none ${booking.status === "pending" ? "bg-[#FF3811]" : "bg-green-600"}`}
                  >
                    {booking.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
