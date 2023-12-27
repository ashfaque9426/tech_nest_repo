import React from 'react';
import { calculateDiscountPercentage, formatNumberWithCommas, fromCamelCase } from '@/utils';
import { FaHandPointLeft } from "react-icons/fa";

function KeyFeaturesComponent({ keyFeaturesObj, price, regularPrice }) {
  return (
      <section>
          <h2 className='text-lg font-semibold mb-5 underline'>Key Features:</h2>

          {/* key features lists by iterating keyFeatures object */}
          <ul className='flex flex-col gap-3'>
              {
                  Object.keys(keyFeaturesObj).map(key => <li key={key} className='text-lg'>
                      <span className='capitalize font-semibold'>{fromCamelCase(key)}</span>: <span>{keyFeaturesObj[key]}</span>
                  </li>)
              }
          </ul>

          {/* price and discount section */}
          <section className='my-5 flex flex-col gap-3'>
              <div className='flex flex-wrap gap-3'>
                  <p className='text-lg'><span className='font-semibold'>Price:</span> {formatNumberWithCommas(price)} BDT Only</p>
                  <p className='text-lg'><span className='font-semibold'>Regular Price:</span> <span className='line-through'>{formatNumberWithCommas(regularPrice)}  BDT Only</span></p>
              </div>

              {/* to show offers that are above zero percent. */}
              {
                  calculateDiscountPercentage(regularPrice, price) > 0 && <p className='text-2xl font-bold flex items-center gap-3'>{calculateDiscountPercentage(regularPrice, price).toFixed(2)}% Off <span className='animate-translateBackAndFourth'><FaHandPointLeft /></span></p>
              }
          </section>
      </section>
  )
}

export default KeyFeaturesComponent;