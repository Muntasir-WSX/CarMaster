"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import CarLoader from "@/ShareComponents/CarLoader";

export default function ManageServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({ 
      title: 'Are you sure?', 
      text: "You won't be able to revert this!",
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!' 
    });
    
    if (result.isConfirmed) {
      const res = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        Swal.fire("Deleted!", "Service removed.", "success");
        fetchServices();
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Services</h2>
        <Link href="/admin/add-service" className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition">
          Add Service
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 font-semibold text-gray-700">Image</th>
              <th className="p-4 font-semibold text-gray-700">Title</th>
              <th className="p-4 font-semibold text-gray-700">Price</th>
              <th className="p-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="p-4 text-center"><CarLoader></CarLoader></td></tr>
            ) : (
              services.map((s) => (
                <tr key={s._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">
                    <img src={s.img} alt={s.title} className="w-16 h-10 rounded object-cover shadow-sm" />
                  </td>
                  <td className="p-4 font-medium">{s.title}</td>
                  <td className="p-4">${s.price}</td>
                  <td className="p-4 flex gap-2">
                    <Link href={`/admin/edit-service/${s._id}`} 
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(s._id)} 
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                      Delete
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