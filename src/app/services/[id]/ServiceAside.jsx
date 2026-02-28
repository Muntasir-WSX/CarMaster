
import FooterLogo from '@/ShareComponents/FooterLogo';
import Link from 'next/link';
import { HiArrowRight, HiOutlineDocumentText } from 'react-icons/hi';

export default function ServiceAside({ price, services = [] }) {
  const hardcodedServices = [
    { id: 1, title: "Full Car Repair" },
    { id: 2, title: "Engine Repair" },
    { id: 3, title: "Automatic Services" },
    { id: 4, title: "Engine Oil Change" },
    { id: 5, title: "Battery Charge" },
  ];

  return (
    <aside className="space-y-6">
      {/* 1. Services List Section */}
      <div className="bg-[#F3F3F3] p-8 rounded-xl">
        <h3 className="text-2xl font-bold mb-6 text-neutral-800">Services</h3>
        <div className="space-y-3">
          {hardcodedServices.map((service) => (
            <div 
              key={service.id} 
              className="flex justify-between items-center p-4 bg-white rounded-lg group hover:bg-[#FF3811] transition-all duration-300 cursor-pointer"
            >
              <span className="font-bold text-neutral-700 group-hover:text-white transition-colors">
                {service.title}
              </span>
             
            </div>
          ))}
        </div>
      </div>

      {/* 2. Download Section */}
      <div className="bg-[#151515] p-8 rounded-xl text-white">
        <h3 className="text-2xl font-bold mb-6">Download</h3>
        <div className="space-y-5">
          <div className="flex justify-between items-center group">
            <div className="flex items-center gap-3">
              <HiOutlineDocumentText className="text-3xl" />
              <div>
                <p className="font-bold">Our Brochure</p>
                <p className="text-sm text-[#737373]">Download</p>
              </div>
            </div>
            <a 
              href="/Brochure.pdf" 
              download 
              className="p-4 bg-[#FF3811] rounded-md hover:bg-orange-600 transition-colors"
            >
              <HiArrowRight className="text-xl" />
            </a>
          </div>

          <div className="flex justify-between items-center group">
            <div className="flex items-center gap-3">
              <HiOutlineDocumentText className="text-3xl" />
              <div>
                <p className="font-bold">Company Details</p>
                <p className="text-sm text-[#737373]">Download</p>
              </div>
            </div>
            <a 
              href="/Details.pdf" 
              download 
              className="p-4 bg-[#FF3811] rounded-md hover:bg-orange-600 transition-colors"
            >
              <HiArrowRight className="text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. Help Card (Black Section) */}
      <div className="bg-[#151515] p-10 rounded-xl text-white text-center mb-16">
        <div className="flex justify-center mb-4">
          <FooterLogo />
        </div>
        <h4 className="text-xl font-bold">Car Doctor</h4>
        <p className="font-bold text-sm mt-2 mb-10">Need Help? We Are Here To Help You</p>
        
        <div className="bg-white text-black p-8 pb-12 rounded-xl relative">
          <p className="font-bold text-lg">
            <span className="text-[#FF3811]">Car Doctor</span> Special
          </p>
          <p className="text-[#737373] text-sm mt-1">
            Save up to <span className="text-[#FF3811]">60% off</span>
          </p>
          
          <button className="bg-[#FF3811] text-white px-8 py-4 rounded-lg font-bold absolute -bottom-7 left-1/2 -translate-x-1/2 w-45 whitespace-nowrap shadow-lg hover:bg-orange-600 transition-all">
            Get A Quote
          </button>
        </div>
      </div>

      {/* 4. Price & Checkout */}
      <div className="pt-4">
        <h2 className="text-3xl font-bold text-neutral-800 mb-4">Price ${price}</h2>
        <Link href={`/checkout/${services[0]?._id || ''}`}>
          <button className="w-full bg-[#FF3811] text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all">
            Proceed Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
}