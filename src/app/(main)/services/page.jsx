"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineArrowRight } from "react-icons/hi";
import ServiceBanner from './[id]/ServiceBanner';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
       
        const res = await fetch("/api/services");
    const data = await res.json();
        if (Array.isArray(data)) {
        setServices(data); 
    } else if (data.data && Array.isArray(data.data)) {
        setServices(data.data); 
    } else if (data.services && Array.isArray(data.services)) {
        setServices(data.services); 
    } else {
        setServices([]); 
    }
      } catch (error) {
        console.error("Error loading services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-2xl font-bold">Loading Services...</div>;
  }

  return (
    <div className="container mx-auto px-4 mb-20 mt-10">
      <ServiceBanner title="Our Services" />

      <div className="text-center mt-12 space-y-4">
        <h3 className="text-[#FF3811] font-bold text-xl">Service</h3>
        <h2 className="text-4xl font-bold text-[#151515]">Our Service Area</h2>
        <p className="text-[#737373] max-w-2xl mx-auto">
          We provide a wide range of automotive services to keep your vehicle running smoothly and safely.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service._id} className="card card-compact bg-base-100 shadow-sm border border-[#E8E8E8] p-6 rounded-xl">
              <figure className="relative h-52 w-full overflow-hidden rounded-xl">
                {service.img && (
                  <Image 
                    src={service.img} 
                    alt={service.title} 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-300" 
                  />
                )}
              </figure>
              <div className="card-body px-0 pt-5">
                <h2 className="card-title text-2xl font-bold text-[#444444]">{service.title}</h2>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-[#FF3811] text-xl font-semibold">Price : ${service.price}</p>
                  <Link href={`/services/${service._id}`}>
                    <button className="text-[#FF3811] transition-transform hover:translate-x-1">
                      <HiOutlineArrowRight size={24} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No services found. Please check your database connection.
          </div>
        )}
      </div>
    </div>
  );
}