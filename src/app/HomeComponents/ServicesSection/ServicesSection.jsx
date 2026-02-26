import ServiceCard from './ServiceCard'
import dbConnect from '@/lib/dbConnect'

export default async function ServicesSection() {
    const servicesCollection = dbConnect('services');
    const services = await servicesCollection.find({}).toArray();

    return (
        <section className="container mx-auto py-20 px-4">
            <div className="text-center mb-12">
                <h3 className="text-xl font-bold text-primary mb-2">Service</h3>
                <h2 className="text-5xl font-bold mb-5 text-neutral-800">Our Service Area</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    
                    <ServiceCard key={service._id.toString()} service={service} />
                ))}
            </div>
        </section>
    );
}