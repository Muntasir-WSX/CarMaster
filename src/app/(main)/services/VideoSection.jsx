"use client";
import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import Image from 'next/image';

export default function VideoSection() {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <div className="relative w-full h-100 rounded-xl overflow-hidden mt-12 group cursor-pointer bg-black">
      {!playVideo ? (
        <div onClick={() => setPlayVideo(true)} className="relative w-full h-full">
          <Image 
            src="/assets/images/banner/2.jpg" 
            alt="Process Video" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-20 h-20 bg-[#FF3811] rounded-full flex items-center justify-center text-white text-2xl animate-pulse group-hover:scale-125 transition-transform">
              <FaPlay />
            </div>
          </div>
        </div>
      ) : (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/chhmCdYt0iQ?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}