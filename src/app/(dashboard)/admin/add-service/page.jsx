"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddServicePage() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const serviceData = {
      title: form.title.value,
      price: form.price.value,
      description: form.description.value,
      img: form.img.value,
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
        <input name="title" placeholder="Service Title" className="w-full p-3 border rounded" required />
        <input name="price" type="number" placeholder="Price" className="w-full p-3 border rounded" required />
        <input name="img" placeholder="Image URL" className="w-full p-3 border rounded" required />
        <textarea name="description" placeholder="Description" className="w-full p-3 border rounded" required />
        <button className="bg-[#FF3811] text-white py-3 px-6 rounded font-bold w-full">Post Service</button>
      </form>
    </div>
  );
}