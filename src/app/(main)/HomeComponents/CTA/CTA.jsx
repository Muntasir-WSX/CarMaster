import React from 'react'
import { FaCalendarAlt, FaPhoneAlt } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';


const infoData = [
    {
        icon: <FaCalendarAlt className="text-[#FF3811] text-3xl" />,
        subtitle: "We are open monday-friday",
        title: "7:00 am - 9:00 pm"
    },
    {
        icon: <FaPhoneAlt className="text-[#FF3811] text-3xl" />,
        subtitle: "Have a question?",
        title: "+2546 251 2658"
    },
    {
        icon: <MdLocationOn className="text-[#FF3811] text-4xl" />,
        subtitle: "Need a repair? our address",
        title: "Liza Street, New York"
    }
];

export default function CTA() {
  return (
    <section className="bg-[#151515] rounded-xl py-16 px-10 md:px-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {infoData.map((item, index) => (
                    <div key={index} className="flex items-center gap-5 text-white">
                        <div className="relative">
                           {item.icon}
                           {index === 0 && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#FF3811] rounded-full border-2 border-[#151515]"></div>}
                        </div>
                        <div>
                            <p className="text-sm font-medium">{item.subtitle}</p>
                            <h3 className="text-2xl font-bold">{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
  )
}
