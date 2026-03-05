"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

export default function CheckoutForm({ serviceData }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleBooking = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const bookingDetails = {
      customerName: session?.user?.name,
      email: session?.user?.email,
      phone: form.phone.value,
      date: form.date.value,
      address: form.address.value,
      message: form.message.value,
      serviceTitle: serviceData.title,
      serviceId: serviceData._id,
      serviceImg: serviceData.img,
      price: serviceData.price,
      status: "pending"
    };

    const loadingToast = toast.loading('Booking in progress...');

    try {
      const response = await fetch('/api/service/booking', { 
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(bookingDetails)
      });

      if (response.ok) {
        toast.success("Service booked successfully!", { id: loadingToast });
        form.reset();
        router.push('/my-bookings');
      } else {
        toast.error("Something went wrong!", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("Failed to connect to server", { id: loadingToast });
    }
  };

  return (
    <div className="bg-[#F3F3F3] p-10 md:p-20 rounded-xl mt-10">
      <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="space-y-2">
          <label className="font-semibold text-neutral-700">Name</label>
          <input
            type="text"
            defaultValue={session?.user?.name}
            readOnly
            className="w-full p-4 rounded-lg bg-gray-200 outline-none cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold text-neutral-700">Service Date</label>
          <input
            name="date"
            type="date"
            required
            className="w-full p-4 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#FF3811]"
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold text-neutral-700">Email</label>
          <input
            name="email"
            type="email"
            defaultValue={session?.user?.email}
            readOnly
            className="w-full p-4 rounded-lg bg-gray-200 outline-none cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold text-neutral-700">Due Amount</label>
          <input
            type="text"
            defaultValue={`$${serviceData.price}`}
            readOnly
            className="w-full p-4 rounded-lg bg-gray-200 outline-none cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold text-neutral-700">Phone Number</label>
          <input
            name="phone"
            type="tel"
            placeholder="Your Phone"
            required
            className="w-full p-4 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#FF3811]"
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold text-neutral-700">Your Address</label>
          <input
            name="address"
            type="text"
            placeholder="Your Address"
            required
            className="w-full p-4 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#FF3811]"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="font-semibold text-neutral-700">Special Instructions</label>
          <textarea
            name="message"
            placeholder="Any specific instructions?"
            rows="5"
            className="w-full p-4 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#FF3811]"
          ></textarea>
        </div>
        
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            className="w-full bg-[#FF3811] text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all shadow-md"
          >
            Order Confirm
          </button>
        </div>
      </form>
    </div>
  );
}