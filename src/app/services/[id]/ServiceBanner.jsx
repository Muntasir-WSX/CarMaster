import Image from 'next/image';
export default function ServiceBanner({ title }) {
  const bannerPath = "/assets/images/checkout/checkout.png";
  return (
    <div className="relative w-full h-75 rounded-xl overflow-hidden mb-20">
     
      <div className="absolute inset-0 z-0">
        <Image
          src={bannerPath} 
          alt="Banner"
          fill
          priority 
          className="object-cover"
        />
       
        <div className="absolute inset-0 bg-linear-to-r from-[#151515] to-transparent"></div>
      </div>
      <div className="relative z-10 h-full flex items-center pl-10 md:pl-24">
        <h1 className="text-white text-4xl md:text-5xl font-bold">
          {title || "Service Details"}
        </h1>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20">
        <div className="relative">
          <div 
            className="bg-[#FF3811] text-white px-10 py-3 font-semibold text-lg"
            style={{ clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)" }}
          >
            Service
          </div>
        </div>
      </div>
    </div>
  );
}