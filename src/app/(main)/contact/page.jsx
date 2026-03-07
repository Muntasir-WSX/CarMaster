"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const banners = [
  "/assets/images/homeCarousel/1.jpg",
  "/assets/images/homeCarousel/2.jpg",
  "/assets/images/homeCarousel/3.jpg"
];

export default function ContactPage() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-20 pb-20">
      <section className="relative h-[60vh] w-full overflow-hidden">
        <AnimatePresence mode='wait'>
          <motion.div 
            key={index}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image src={banners[index]} alt="Banner" fill className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
          <motion.h1 initial={{ y: 30 }} animate={{ y: 0 }} className="text-6xl font-bold">Get In Touch</motion.h1>
          <p className="text-xl mt-4">We are here to help you</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <FaClock />, title: "Opening Hours", info: "Mon-Fri: 7:00 am - 9:00 pm" },
          { icon: <FaPhoneAlt />, title: "Have a question?", info: "+2546 251 2658" },
          { icon: <FaMapMarkerAlt />, title: "Need a repair?", info: "Liza Street, New York" }
        ].map((item, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.05 }} 
            className="p-8 border border-gray-100 rounded-xl text-center bg-white shadow-lg"
          >
            <div className="text-4xl text-[#FF3811] mb-4 flex justify-center">{item.icon}</div>
            <h3 className="font-bold text-xl">{item.title}</h3>
            <p className="text-gray-600 mt-2 font-semibold">{item.info}</p>
          </motion.div>
        ))}
      </section>
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Meet Our Experts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 1, img: "/assets/images/team/1.jpg", name: "Alex Benjamin", expert: "Engine Diagnostic Expert" },
            { id: 2, img: "/assets/images/team/2.jpg", name: "Marcus Rickeltone", expert: "Master Mechanic" },
            { id: 3, img: "/assets/images/team/3.jpg", name: "John Brooks", expert: "Tire & Brake Specialist" }
          ].map((member) => (
            <motion.div 
              key={member.id} 
              whileHover={{ y: -15 }}
              className="rounded-2xl overflow-hidden shadow-xl bg-white"
            >
              <div className="h-72 relative">
                <Image src={member.img} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-2xl font-bold">{member.name}</h4>
                <p className="text-[#FF3811] font-medium text-lg mt-1">{member.expert}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Location</h2>
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            className="w-full h-100 rounded-2xl overflow-hidden shadow-2xl"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.5645!2d-74.006!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sbd!4v1600000000000" 
            width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy">
          </iframe>
        </motion.div>
      </section>
    </div>
  );
}