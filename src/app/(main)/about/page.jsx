"use client";
import React from 'react';
import Image from 'next/image';
import { FaAward, FaTools, FaUsers, FaClock, FaCheckCircle, FaCar, FaOilCan, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const images = [
  "/assets/images/homeCarousel/3.jpg",
  "/assets/images/banner/3.jpg",
  "/assets/images/banner/5.jpg"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
};

export default function AboutMain() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image src={images[0]} alt="Banner" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-white text-7xl font-bold"
          >
            About Car Master
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white text-xl mt-4"
          >
            Excellence in every repair, passion in every mile.
          </motion.p>
        </div>
      </section>
      <motion.section 
        variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4"
      >
        {[
          { icon: <FaAward />, title: "10+ Years", desc: "Experience in Service" },
          { icon: <FaTools />, title: "5000+ Repairs", desc: "Successfully Done" },
          { icon: <FaUsers />, title: "2000+ Clients", desc: "Satisfied Customers" },
          { icon: <FaClock />, title: "24/7 Support", desc: "Always Ready" }
        ].map((item, i) => (
          <motion.div key={i} variants={itemVariants} className="p-10 border border-gray-100 rounded-2xl text-center hover:shadow-2xl bg-white transition-all">
            <div className="text-5xl text-[#FF3811] mb-6 flex justify-center">{item.icon}</div>
            <h3 className="text-3xl font-bold">{item.title}</h3>
            <p className="text-gray-500 mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </motion.section>
      <section className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-16 items-center">
        <motion.div initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="md:w-1/2 space-y-8">
            <h2 className="text-5xl font-bold leading-tight">Comprehensive <br/> Car Solutions</h2>
            <p className="text-gray-600 text-lg">We don't just fix cars; we care for them. Our master mechanics are trained in the latest hybrid and electric vehicle diagnostics, ensuring your car stays future-proof.</p>
            <div className="grid grid-cols-2 gap-4">
                {["Certified Team", "Genuine Parts", "Advanced Tech", "Transparent Prices"].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-bold list-none">
                        <FaCheckCircle className="text-[#FF3811]" /> {feat}
                    </li>
                ))}
            </div>
        </motion.div>
        <motion.div initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="md:w-1/2 h-125 w-full relative rounded-3xl overflow-hidden shadow-2xl">
            <Image src={images[1]} alt="Work" fill className="object-cover" />
        </motion.div>
      </section>
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
            {[
                { title: "Engine Diagnostics", icon: <FaCar />, text: "State of the art engine scanners for precise fault detection." },
                { title: "Oil & Filter Change", icon: <FaOilCan />, text: "High-grade lubricants and filters for engine longevity." },
                { title: "Safety Inspection", icon: <FaShieldAlt />, text: "Complete 360-degree vehicle safety and performance check." }
            ].map((s, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-[#FF3811] transition-all">
                    <div className="text-4xl text-[#FF3811] mb-6">{s.icon}</div>
                    <h4 className="text-2xl font-bold mb-4">{s.title}</h4>
                    <p className="text-gray-600">{s.text}</p>
                </div>
            ))}
        </div>
      </section>
      <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden">
        <Image src={images[2]} alt="Mission" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#FF3811]/50 flex items-center justify-center px-4">
            <div className="max-w-4xl text-center text-white space-y-6">
                <h2 className="text-5xl font-bold">Our Mission</h2>
                <p className="text-2xl italic leading-relaxed">
                    "To be the most trusted automotive service provider by delivering unmatched quality, 
                    fostering long-term client relationships, and maintaining the highest standards of safety."
                </p>
            </div>
        </div>
      </section>
      
    </div>
  );
}