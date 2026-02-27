"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteRight } from 'react-icons/fa';

const testimonialsData = [
  {
    id: 1,
    name: "Alex Benjamin",
    role: "Business Consultant",
    img: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1770900343/user9_vuaywr.jpg",
    rating: 5,
    review: "Excellent engine diagnostic service! They identified the issue in minutes that other garages couldn't find for days. Highly recommended."
  },
  {
    id: 2,
    name: "Fatima Al-Sayed",
    role: "Graphic Designer",
    img: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1770900330/user11_gaqtuk.jpg",
    rating: 4,
    review: "Service quality is great, but the waiting area could be a bit more comfortable. Overall a solid 4-star experience."
  },
  {
    id: 3,
    name: "Emina Dragovic",
    role: "Architect",
    img: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1770900330/user12_ipoved.jpg",
    rating: 5,
    review: "Professional behavior and transparent pricing. As a Turkish expat, I finally found a reliable place for my car maintenance."
  },
  {
    id: 4,
    name: "Lukas Weber",
    role: "Tech Enthusiast",
    img: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1770899573/user1_kze248.jpg",
    rating: 5,
    review: "The brake service was top-notch. My car feels much safer now. Fast delivery and expert handling by the mechanics."
  },
  {
    id: 5,
    name: "Robert Fischer",
    role: "Engineer",
    img: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1770899573/user2_a2cs3g.jpg",
    rating: 3,
    review: "Service was okay. However, the delivery was slightly delayed. The repair quality is good but needs better time management."
  },
  {
    id: 6,
    name: "Hans Schmidt",
    role: "Retired Professor",
    img: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1747153255/samples/smile.jpg",
    rating: 5,
    review: "German precision in repairs! I'm very satisfied with how they handled my vintage vehicle's engine restoration."
  },
  {
    id: 7,
    name: "Zsofia Molnar",
    role: "Freelancer",
    img: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1770899573/user5_z1sayv.jpg",
    rating: 4,
    review: "Friendly staff and reasonable prices. They explained everything clearly before starting the work. Very transparent."
  },
  {
    id: 8,
    name: "Carlos Mendez",
    role: "Sales Executive",
    img: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1770902014/user13_upighw.jpg",
    rating: 5,
    review: "Increíble servicio! Fast, efficient, and very professional. My go-to place for all car-related issues from now on."
  }
];

export default function Testimonials() {
  const duplicatedData = [...testimonialsData, ...testimonialsData];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
      
        <div className="text-center mb-16">
          <h3 className="text-xl font-bold text-[#FF3811] mb-2">Testimonial</h3>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">What Customer Says</h2>
          <p className="text-[#737373] max-w-2xl mx-auto">
            The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look Even Slightly Believable.
          </p>
        </div>
        <div className="relative w-full overflow-hidden">
          <motion.div 
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }} 
            transition={{
              duration: 50, 
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ display: 'flex' }}
          >
            {duplicatedData.map((item, index) => (
              <div 
                key={`${item.id}-${index}`}
                className="w-87.5 md:w-125 border border-[#E8E8E8] rounded-xl p-8 bg-white select-none hover:border-[#FF3811]/30 transition-colors"
              >
                {/* User Info Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                      <Image 
                        src={item.img} 
                        alt={item.name} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-2xl text-[#444444] whitespace-nowrap">{item.name}</h4>
                      <p className="text-[#737373] font-semibold">{item.role}</p>
                    </div>
                  </div>
                  <div className="text-[#FF3811]/20 text-5xl">
                    <FaQuoteRight />
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-[#737373] leading-7 mb-5 italic min-h-20">
                  "{item.review}"
                </p>

                {/* Ratings */}
                <div className="flex gap-1 text-[#FF912C]">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < item.rating ? "text-[#FF912C]" : "text-gray-200"} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}