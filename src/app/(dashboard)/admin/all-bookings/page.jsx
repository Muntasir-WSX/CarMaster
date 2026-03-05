"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AllBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  const fetchBookings = async () => {
    setLoading(true);
    const res = await fetch(
      `/api/admin/all-bookings?page=${currentPage}&limit=${limit}`,
    );
    const data = await res.json();
    setBookings(data.data);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [currentPage]);

  const handleUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "approved" : "pending";
    const res = await fetch("/api/admin/all-bookings", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });

    if (res.ok) {
      Swal.fire("Success", `Status updated to ${newStatus}`, "success");
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b)),
      );
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await fetch(`/api/admin/all-bookings?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        Swal.fire("Deleted!", "Booking removed.", "success");
        setBookings((prev) => prev.filter((item) => item._id !== id));
      }
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-sm overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">Manage All Bookings</h2>

      {/* Table container for responsiveness */}
      <div className="min-w-full inline-block align-middle">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Service
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date & Address
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : (
              bookings.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-bold">{item.serviceTitle}</div>
                    <div className="text-sm text-gray-500">${item.price}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {item.customerName}
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-xs">{item.date}</p>
                    <p className="text-xs font-bold text-blue-600 truncate max-w-37.5">
                      {item.address}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 text-[10px] rounded-full font-bold ${item.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleUpdate(item._id, item.status)}
                        className={`px-3 py-1 text-[11px] font-bold rounded border transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                          item.status === "pending"
                            ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
                            : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                        }`}
                      >
                        {item.status === "pending" ? "Approve" : "Cancel"}
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-3 py-1 text-[11px] font-bold rounded bg-red-500 text-white border border-red-500 transition-all duration-200 transform hover:bg-red-600 hover:shadow-lg active:scale-95"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
