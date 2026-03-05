"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddServicePage() {
  const router = useRouter();
  const [facilities, setFacilities] = useState([{ name: "", details: "" }]);
  const handleAddFacility = () => {
    setFacilities([...facilities, { name: "", details: "" }]);
  };

  const handleFacilityChange = (index, field, value) => {
    const updated = [...facilities];
    updated[index][field] = value;
    setFacilities(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const serviceData = {
      service_id: form.service_id.value,
      title: form.title.value,
      price: form.price.value,
      img: form.img.value,
      description: form.description.value,
      facility: facilities, 
    };

    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(serviceData),
    });

    if (res.ok) {
      toast.success("Service Added Successfully!");
      router.push("/admin/manage-services");
    }
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="service_id" placeholder="Service ID (e.g., 04)" className="w-full p-3 border rounded" required />
        <input name="title" placeholder="Service Title" className="w-full p-3 border rounded" required />
        <input name="price" type="number" placeholder="Price" className="w-full p-3 border rounded" required />
        <input name="img" placeholder="Image URL" className="w-full p-3 border rounded" required />
        <textarea name="description" placeholder="Description" className="w-full p-3 border rounded" required />
        
        {/* Facilities Section */}
        <div className="border-t pt-4">
          <h3 className="font-bold mb-2">Facilities:</h3>
          {facilities.map((f, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input placeholder="Name" className="w-1/3 p-2 border rounded" onChange={(e) => handleFacilityChange(index, 'name', e.target.value)} />
              <input placeholder="Details" className="w-2/3 p-2 border rounded" onChange={(e) => handleFacilityChange(index, 'details', e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={handleAddFacility} className="text-sm text-blue-600 underline">+ Add More Facility</button>
        </div>

        <button className="bg-[#FF3811] text-white py-3 px-6 rounded font-bold w-full">Post Service</button>
      </form>
    </div>
  );
}