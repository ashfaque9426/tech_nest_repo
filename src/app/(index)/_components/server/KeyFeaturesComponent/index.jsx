import React from 'react';
import { calculateDiscountPercentage, formatNumberWithCommas, fromCamelCase } from '@/utils';

function KeyFeaturesComponent({productData}) {
  return (
      <section>
          <h2 className='text-lg font-semibold mb-5 underline'>Key Features:</h2>

          {/* key features lists by iterating keyFeatures object */}
          <ul className='flex flex-col gap-3'>
              {
                  Object.keys(productData.keyFeatures).map(key => <li key={key} className='text-lg'>
                      <span className='capitalize font-semibold'>{fromCamelCase(key)}</span>: <span>{productData.keyFeatures[key]}</span>
                  </li>)
              }
          </ul>

          {/* price and discount section */}
          <section className='my-5 flex flex-col gap-3'>
              <div className='flex flex-wrap gap-3'>
                  <p className='text-lg'><span className='font-semibold'>Price:</span> {formatNumberWithCommas(productData?.price)} BDT Only</p>
                  <p className='text-lg'><span className='font-semibold'>Regular Price:</span> <span className='line-through'>{formatNumberWithCommas(productData?.regularPrice)}  BDT Only</span></p>
              </div>
              <p className='text-2xl font-bold'>{calculateDiscountPercentage(productData?.regularPrice, productData.price).toFixed(2)}% Off</p>
          </section>
      </section>
  )
}

export default KeyFeaturesComponent;