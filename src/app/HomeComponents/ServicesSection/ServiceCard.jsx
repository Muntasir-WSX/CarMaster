import Image from 'next/image';
import { HiArrowRight } from 'react-icons/hi'; // react-icons install না থাকলে সাধারণ <span> দিতে পারেন

export default function ServiceCard({ service }) {
    const { title, img, price } = service;

    return (
        <div className="card card-compact bg-base-100 border border-gray-200 p-5 shadow-sm rounded-xl">
            <figure className="relative h-50 w-full overflow-hidden rounded-lg">
                <Image 
                    src={img} 
                    alt={title} 
                    fill 
                    className="object-cover"
                />
            </figure>
            <div className="card-body px-0 pb-0 pt-4">
                <h2 className="card-title text-2xl font-bold text-neutral-700">{title}</h2>
                <div className="flex items-center justify-between text-primary font-bold text-xl mt-2">
                    <p>Price: ${price}</p>
                    <button className="btn btn-ghost btn-circle btn-sm text-primary">
                        <HiArrowRight size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
}