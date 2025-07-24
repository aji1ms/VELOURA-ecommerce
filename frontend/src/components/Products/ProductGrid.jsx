import React from 'react'
import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
            {products.map((product, index) => (
                <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="block"
                >
                    <div className='bg-white p-4 rounded-lg'>
                        <div className='w-full h-80 mb-4'>
                            <img
                                src={product.images[0].url}
                                alt={product.name}
                                className='w-full h-80 object-cover'
                            />
                        </div>
                        <h3 className='text-sm'>{product.name}</h3>
                        <p className='text-black font-bold text-sm tracking-tighter'>
                            Rs.{product.price}.00
                        </p>
                    </div>
                </Link>
            ))}
        </div>

    )
}

export default ProductGrid;
