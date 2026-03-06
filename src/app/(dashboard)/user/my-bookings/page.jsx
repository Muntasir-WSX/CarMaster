"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function MyBookingsPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/bookings?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          setLoading(false);
        });
    }
  }, [session?.user?.email]);

  if (loading) return <div className="text-center py-20 animate-pulse text-[#FF3811]">Loading your journey...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Journey Log</h2>
      
      {bookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-gray-500">
                <th>Service</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="font-semibold">{booking.serviceName}</td>
                  <td>{booking.date}</td>
                  <td>${booking.price}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No bookings found. Start your journey by booking a service!
        </div>
      )}
    </div>
  );
}