import Image from 'next/image';
import { HiArrowRight } from 'react-icons/hi';

export default function ServiceCard({ service }) {
    const { title, img, price } = service;

    return (
        <div className="card card-compact bg-base-100 border border-gray-200 p-5 shadow-sm rounded-xl">
            {/* ইমেজ হাইট ফিক্সড করা হয়েছে (h-[200px]) */}
            <figure className="relative h-[200px] w-full overflow-hidden rounded-lg">
                <Image 
                    src={img} 
                    alt={title} 
                    fill 
                    className="object-cover"
                />
            </figure>
            <div className="card-body px-0 pb-0 pt-4">
                <h2 className="card-title text-2xl font-bold text-neutral-700">{title}</h2>
                <div className="flex items-center justify-between text-[#FF3811] font-bold text-xl mt-2">
                    <p>Price: ${price}</p>
                    {/* অ্যারো বাটনে থিম কালার */}
                    <button className="btn btn-ghost btn-circle btn-sm text-[#FF3811]">
                        <HiArrowRight size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
}