"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { image: "/assets/images/banner/1.jpg", title: "Expert Engine Diagnostics & Repair" },
  { image: "/assets/images/banner/2.jpg", title: "Affordable Price For Car Servicing" },
  { image: "/assets/images/banner/3.jpg", title: "Precision Brake & Suspension Tuning" },
  { image: "/assets/images/banner/4.jpg", title: "Complete Electrical System Overhaul" },
  { image: "/assets/images/banner/5.jpg", title: "Fast & Reliable Battery Health Check" },
  { image: "/assets/images/banner/6.jpg", title: "Automatic Transmission Fluid Service" },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full mt-2"> 
      <div className="relative h-100 sm:h-125 lg:h-150 w-full overflow-hidden rounded-xl bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.4, 0, 0.2, 1] 
            }} 
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slides[current].image}
              alt="Car Service"
              fill
              className="object-cover opacity-60"
              priority
            />
            
            <div className="absolute inset-0 bg-linear-to-r from-[#151515] to-transparent flex items-center">
              <div className="text-white px-6 sm:px-12 md:px-24 space-y-4 sm:space-y-7 w-full md:w-2/3 lg:w-1/2">
                <motion.h2 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  {slides[current].title}
                </motion.h2>
                
                <motion.p 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="text-sm sm:text-lg opacity-90"
                >
                  Professional mechanics you can trust. We ensure peak performance 
                  with genuine parts and expert care.
                </motion.p>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                  className="flex gap-3 sm:gap-5"
                >
                  <button className="btn btn-sm sm:btn-md bg-[#FF3811] border-[#FF3811] text-white hover:bg-transparent">
                    Book Now
                  </button>
                  <button className="btn btn-sm sm:btn-md btn-outline border-white text-white hover:bg-[#FF3811] hover:border-[#FF3811]">
                    Our Services
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}