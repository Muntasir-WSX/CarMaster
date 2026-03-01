import dbConnect, { collectionsName } from '@/lib/dbConnect';
import ServiceCard from './ServiceCard'


export default async function ServicesSection() {
    const servicesCollection = await dbConnect(collectionsName.servicesCollection);
    const services = await servicesCollection.find({}).toArray();

    return (
        <section className="w-full">
            <div className="text-center mb-12">
                <h3 className="text-xl font-bold text-[#FF3811] mb-2">Service</h3>
                <h2 className="text-5xl font-bold mb-5 text-neutral-800">Our Service Area</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">We provide a wide range of automotive services to keep your vehicle running smoothly and safely.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    
                    <ServiceCard key={service._id.toString()} service={service} />
                ))}
            </div>
            <div className="text-center mt-12">
                <button className="btn btn-outline border-[#FF3811] text-[#FF3811] hover:bg-[#FF3811] hover:border-[#FF3811] hover:text-white px-8 rounded-md transition-all duration-300">
                    More Services
                </button>
            </div>
        </section>
    );
}