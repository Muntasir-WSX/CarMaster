import Image from 'next/image'
import React from 'react'
import ServiceCard from './ServiceCard'

export default async function ServicesSection() {
  return (
    <section className="container mx-auto py-20 px-4">
            {/* Header Area */}
            <div className="text-center mb-12">
                <h3 className="text-xl font-bold text-primary mb-2">Service</h3>
                <h2 className="text-5xl font-bold mb-5 text-neutral-800">Our Service Area</h2>
                <p className="max-w-2xl mx-auto text-neutral-500">
                    The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised 
                    Words Which Don't Look Even Slightly Believable.
                </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <ServiceCard key={service._id} service={service} />
                ))}
            </div>

            {/* Bottom Button */}
            <div className="text-center mt-12">
                <button className="btn btn-outline btn-primary px-8">More Services</button>
            </div>
        </section>
  )
}
