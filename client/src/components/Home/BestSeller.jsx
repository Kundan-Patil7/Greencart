import React from 'react'
import ProductCard from './ProductCard';
import { useAppContext } from '../../context/AppContext';

const BestSeller = () => {
  const { products=[] } = useAppContext();

  return (
<div className='mt-16 px-4 md:px-8'>
  <p className='text-2xl md:text-3xl font-medium mb-4'>Best Sellers</p>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
    {products
      .filter((product) => product?.inStock)
      .slice(0, 5)
      .map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
  </div>
</div>

  )
}

export default BestSeller;
