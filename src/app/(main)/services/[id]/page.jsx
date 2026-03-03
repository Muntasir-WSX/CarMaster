import dbConnect, { collectionsName } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import ServiceBanner from './ServiceBanner';
import ServiceAside from './ServiceAside';
import VideoSection from '../VideoSection';
import { notFound } from 'next/navigation';

export default async function ServicesDetails({ params }) {
  const { id } = await params;
  let data = null;
  try {
    const servicesCollection = await dbConnect(collectionsName.servicesCollection);
    data = await servicesCollection.findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error("Database error or invalid ID:", error);
  }

 
  if (!data) {
    return notFound();
  }

  

  
  const steps = [
    { id: "01", title: "Step One", description: "Easy Online Booking and Scheduling." },
    { id: "02", title: "Step Two", description: "Expert Inspection and Diagnosis." },
    { id: "03", title: "Step Three", description: "Quality Repair and Final Testing." }
  ];

  return (
    <section className="container mx-auto px-4 pb-20 mt-10">
  
      <ServiceBanner title={data.title} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
     
        <div className="lg:col-span-2 space-y-8">
         
          <div className="relative w-full h-100 rounded-xl overflow-hidden shadow-lg">
            <Image 
              src={data.img} 
              alt={data.title} 
              fill 
              className="object-cover" 
              priority 
            />
          </div>

          <h2 className="text-4xl font-bold text-neutral-800">{data.title}</h2>
          <p className="text-gray-500 leading-relaxed text-justify">{data.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.facility?.map((item, idx) => (
              <div key={idx} className="bg-[#F3F3F3] p-8 rounded-xl border-t-2 border-[#FF3811] hover:shadow-md transition-shadow">
                <h4 className="text-xl font-bold mb-2 text-neutral-700">{item.name}</h4>
                <p className="text-gray-500 text-sm">{item.details}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-500 leading-relaxed text-justify">{data.description}</p>
          <div className="py-10">
            <h3 className="text-3xl font-bold">3 Simple Steps to Process</h3>
            <p className="text-gray-500 mb-8 mt-2">We follow a streamlined process to ensure your vehicle receives the best care possible.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center border rounded-2xl p-8 hover:bg-gray-50 transition-all duration-300">
                  <div className="w-20 h-20 bg-[#FF3811]/10 border-8 border-[#FF3811]/20 rounded-full flex items-center justify-center mb-4">
                    <span className="bg-[#FF3811] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                      {step.id}
                    </span>
                  </div>
                  <h5 className="font-bold uppercase mb-2 text-neutral-800">{step.title}</h5>
                  <p className="text-sm text-gray-400 px-2 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <VideoSection />
        </div>
        <div className="lg:col-span-1">
         
          <ServiceAside price={data.price} serviceId={id} />
        </div>
      </div>
    </section>
  );
}