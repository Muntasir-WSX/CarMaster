import React from 'react';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const teamData = [
  { id: 1, img: "/assets/images/team/1.jpg", name: "Alex Benjamin", expert: "Engine Diagnostic Expert" },
  { id: 2, img: "/assets/images/team/2.jpg", name: "Marcus Rickeltone", expert: "Master Mechanic" },
  { id: 3, img: "/assets/images/team/3.jpg", name: "John Brooks", expert: "Tire & Brake Specialist" },
];

export default function Team() {
  const portfolioLink = "https://myportfolio-ea142.web.app/";

  return (
    <div >
      <div className="text-center mb-12">
        <h3 className="text-xl font-bold text-[#FF3811] mb-2">Team</h3>
        <h2 className="text-4xl md:text-5xl font-bold mb-5">Meet Our Expert Team</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Our team of certified professionals is dedicated to keeping your vehicle safe on the road. With years of hands-on experience in modern automotive technology.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10">
        {teamData.map((member) => (
          <div key={member.id} className="border border-gray-200 rounded-xl p-6 text-center bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="relative w-full aspect-4/3 mb-5 overflow-hidden rounded-xl">
              <Image 
                src={member.img} 
                alt={member.name} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-105" 
              />
            </div>

            <h4 className="font-bold text-2xl mb-2 text-[#444444]">{member.name}</h4>
            <p className="text-[#737373] font-semibold mb-4">{member.expert}</p>
            <div className="flex justify-center gap-3">
              <SocialIcon link={portfolioLink} icon={<FaFacebook />} color="bg-[#395185]" />
              <SocialIcon link={portfolioLink} icon={<FaTwitter />} color="bg-[#55ACEE]" />
              <SocialIcon link={portfolioLink} icon={<FaLinkedin />} color="bg-[#0A66C2]" />
              <SocialIcon link={portfolioLink} icon={<FaInstagram />} color="bg-[#D82D7E]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialIcon({ icon, color, link }) {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg cursor-pointer hover:scale-110 transition-all ${color}`}
    >
      {icon}
    </a>
  );
}