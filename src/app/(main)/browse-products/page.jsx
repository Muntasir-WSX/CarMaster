"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CarLoader from '@/ShareComponents/CarLoader';

export default function BrowseProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/browse-products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <CarLoader></CarLoader>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Browse Our Products</h2>
        <p className="text-gray-500 mt-2">Find the best parts for your car's journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="card bg-white border border-gray-100 p-4 rounded-xl hover:shadow-lg transition-all">
            <figure className="relative h-48 w-full overflow-hidden rounded-lg">
              <Image src={product.image} alt={product.title} fill className="object-cover" />
            </figure>
            <div className="mt-4">
              <h3 className="font-bold text-lg">{product.title}</h3>
              <p className="text-sm text-gray-500 italic">{product.category}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[#FF3811] font-bold text-xl">${product.price}</span>
                <button className="btn btn-sm bg-gray-900 text-white hover:bg-[#FF3811]">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}