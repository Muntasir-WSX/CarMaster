"use client";
import CarLoader from "@/ShareComponents/CarLoader";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; 

export default function AllAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/all-appointments?page=${currentPage}&limit=${limit}`,
      );
      const data = await res.json();
      setAppointments(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      Swal.fire("Error", "Failed to load appointments", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [currentPage]);

  const handleStatusUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "approved" : "pending";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to set this status to ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF3811",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      const res = await fetch("/api/admin/all-appointments", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        Swal.fire("Updated!", `Status changed to ${newStatus}.`, "success");
        setAppointments((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, status: newStatus } : item,
          ),
        );
      } else {
        Swal.fire("Error", "Update failed!", "error");
      }
    }
  };

  const viewDetails = (item) => {
  Swal.fire({
    title: 'Appointment Details',
    html: `
      <div style="text-align: left;">
        <p><b>Name:</b> ${item.name}</p>
        <p><b>Address:</b> ${item.address}</p>
        <p><b>Problem:</b> ${item.problem}</p>
      </div>
    `,
    icon: 'info',
    confirmButtonText: 'Close'
  });
};

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">All Appointments</h2>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl">
        <table className="table w-full">
          <thead className="bg-gray-50">
            <tr>
              <th>Customer</th>
              <th>Contact Info</th>
              <th>Problem & Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-10">
                  <CarLoader></CarLoader>
                </td>
              </tr>
            ) : (
              appointments.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-xs opacity-60">{item.email}</div>
                  </td>
                  <td>
                    <div className="text-sm font-medium">{item.phone}</div>
                  </td>
                  <td className="max-w-xs cursor-pointer hover:bg-gray-100 transition-colors" 
  onClick={() => viewDetails(item)} 
>
                    <p className="text-xs font-semibold truncate text-gray-700">
                      {item.problem}
                    </p>
                    <p className="text-[11px] text-blue-600 font-bold mt-1">
                    {item.address}
                    </p>
                    
                  </td>
                  <td>
                    <span
                      className={`badge ${item.status === "pending" ? "badge-warning" : "badge-success"}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleStatusUpdate(item._id, item.status)}
                      className="btn btn-sm btn-outline hover:bg-[#FF3811] hover:text-white hover:border-[#FF3811]"
                    >
                      {item.status === "pending" ? "Approve" : "Revert"}
                    </button>
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
