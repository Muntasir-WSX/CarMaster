"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { HiOutlineInformationCircle, HiHome, HiOfficeBuilding } from "react-icons/hi";

export default function AppointmentsPage() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = () => {
    if (session?.user?.email) {
      fetch(`/api/appointment?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setAppointments(data);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [session?.user?.email]);

  // গ্রাহকের সমস্যা এবং তথ্য দেখার জন্য পপআপ
  const showDetails = (item) => {
    Swal.fire({
      title: `<span class="text-xl font-bold">${item.serviceTitle || "Appointment Details"}</span>`,
      html: `
        <div class="text-left space-y-2 text-gray-600">
          <p><strong>Problem:</strong> ${item.problem || "N/A"}</p>
          <p><strong>Address:</strong> ${item.address}</p>
          <p><strong>Phone:</strong> ${item.phone}</p>
          <p><strong>Request Date:</strong> ${new Date(item.createdAt).toLocaleDateString()}</p>
        </div>
      `,
      confirmButtonColor: "#FF3811",
    });
  };

  if (loading) return <div className="text-center py-20 animate-pulse text-[#FF3811]">Loading Service Echoes...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Service Echoes</h2>
      
      {appointments.length > 0 ? (
        <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-100">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr className="text-gray-500 uppercase text-xs">
                <th>Service Details</th>
                <th>Type</th>
                <th>Scheduled Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((item) => (
                <tr key={item._id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="flex items-center gap-2">
                    <span className="font-bold text-gray-700">{item.serviceTitle || "General Checkup"}</span>
                    <button onClick={() => showDetails(item)} className="text-blue-400 hover:text-blue-600">
                      <HiOutlineInformationCircle size={18} />
                    </button>
                  </td>
                  <td>
                    {/* Home Visit চেক */}
                    {item.homeVisit ? (
                      <div className="flex items-center gap-1 text-orange-600 text-xs font-semibold">
                        <HiHome size={14} /> Home Visit
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <HiOfficeBuilding size={14} /> On-Shop
                      </div>
                    )}
                  </td>
                  <td className="text-gray-600 text-sm font-medium">{item.date}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      item.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.status || 'pending'}
                    </span>
                  </td>
                  <td>
                    {item.status !== 'approved' ? (
                      <button 
                        onClick={() => handleCancel(item._id)}
                        className="text-red-400 hover:text-red-600 text-xs font-bold underline"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-gray-300 text-xs italic">Confirmed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400 border-2 border-dashed rounded-2xl">
          <p>No service echoes found yet.</p>
        </div>
      )}
    </div>
  );
}