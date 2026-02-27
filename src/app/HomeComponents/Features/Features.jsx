import React from 'react';
import Image from 'next/image';

const featuresData = [
    { img: "/assets/icons/group.svg", title: "Expert Team" },
    { img: "/assets/icons/Group 38729.svg", title: "Timely Delivery" },
    { img: "/assets/icons/person.svg", title: "24/7 Support" },
    { img: "/assets/icons/Wrench.svg", title: "Best Equipment" },
    { img: "/assets/icons/check.svg", title: "100% Guranty" },
    { img: "/assets/icons/deliveryt.svg", title: "Fast Delivery" }, 
];

export default function Features() {
    return (
        <section>
            <div className="text-center mb-12">
                <h3 className="text-xl font-bold text-[#FF3811] mb-2">Core Features</h3>
                <h2 className="text-4xl md:text-5xl font-bold mb-5">Why Choose Us</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look Even Slightly Believable.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {featuresData.map((feature, index) => (
                    <div 
                        key={index}
                        
                        className="group border border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 hover:bg-[#FF3811] bg-white"
                    >
                       
                        <div className="relative w-12 h-12 transition-all duration-300 group-hover:brightness-0 group-hover:invert">
                            <Image 
                                src={feature.img} 
                                alt={feature.title} 
                                fill 
                                className="object-contain"
                            />
                        </div>

                        
                        <h4 className="font-bold text-lg text-[#444444] transition-colors duration-300 group-hover:text-white">
                            {feature.title}
                        </h4>
                    </div>
                ))}
            </div>
        </section>
    );
}