import ServiceBanner from "@/app/(main)/services/[id]/ServiceBanner";
import dbConnect, { collectionsName } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import React from 'react';
import CheckoutForm from "../forms/checkoutforms";


export default async function CheckoutPage({ params }) {
    const { id } = await params;
    
    let data = null;
    try {
        const servicesCollection = await dbConnect(collectionsName.servicesCollection);
        data = await servicesCollection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
        console.error("Database error:", error);
    }

    if (!data) {
        return <div className="text-center py-20 text-2xl font-bold">Service Not Found! (404)</div>;
    }

    const plainData = JSON.parse(JSON.stringify(data));

    return (
        <section className="container mx-auto px-4 pb-20 mt-10">
         
            <ServiceBanner title="Check Out" />

            <div className="mt-12">
                <h2 className="text-3xl font-bold text-center mb-2">Service: {data.title}</h2>
                <p className="text-center text-xl text-[#FF3811] font-semibold mb-8">Price: ${data.price}</p>
                
              
                <CheckoutForm serviceData={plainData} />
            </div>
        </section>
    );
}