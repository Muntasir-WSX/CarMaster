import React from 'react';
import Image from 'next/image';

const person = "/assets/images/about_us/person.jpg";
const parts = "/assets/images/about_us/parts.jpg";

export default function AboutUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10 lg:px-0">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        <div className="w-full lg:w-1/2 relative h-100 md:h-137.5">
          <div className="w-4/5 h-4/5 relative overflow-hidden rounded-xl shadow-xl">
            <Image
              src={person}
              alt="Professional Mechanic"
              fill
              // sizes যোগ করা হয়েছে ওয়ার্নিং দূর করতে
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="absolute right-0 bottom-0 w-3/5 h-3/5 border-8 border-white rounded-xl shadow-2xl overflow-hidden">
            <Image
              src={parts}
              alt="Car Parts"
              fill
              // sizes যোগ করা হয়েছে ওয়ার্নিং দূর করতে
              sizes="(max-width: 768px) 60vw, 30vw"
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 space-y-5 text-center lg:text-left">
          <h5 className="text-[#FF3811] text-xl font-bold">About Us</h5>
          <h2 className="text-4xl md:text-5xl font-bold text-[#151515] leading-tight">
            We are qualified <br /> & of experience <br /> in this field
          </h2>
          
          <div className="space-y-4 text-[#737373] text-lg">
            <p>
              There are many variations of passages of Lorem Ipsum available, 
              but the majority have suffered alteration in some form, by injected 
              humour, or randomised words which don't look even slightly believable.
            </p>
            <p>
              The majority have suffered alteration in some form, by injected 
              humour, or randomised words which don't look even slightly believable.
            </p>
          </div>

          <button className="btn bg-[#FF3811] border-[#FF3811] text-white hover:bg-transparent hover:text-[#FF3811] px-8 font-semibold">
            Get More Info
          </button>
        </div>
      </div>
    </section>
  );
}