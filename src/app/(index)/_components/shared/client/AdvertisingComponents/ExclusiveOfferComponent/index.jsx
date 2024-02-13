import React from 'react';
import Link from 'next/link';
import cn from '@/lib/clsx/cn';

function ExclusiveOfferComponent({ className, discountSlogan, discountValue, exact }) {
  return (
    <Link className='group' href={`/discountedProducts/${discountValue}/${exact}`}>
      <section className={cn('py-12 flex justify-center bg-[url("/background-Images/techProductDiscountAdBG1.jpg")] bg-cover bg-center relative z-10', className)}>
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black z-20 bg-opacity-5'></div>

        <div className='relative z-30 px-5 text-center 2xl:text-start'>
          <h2 className='bg-black bg-opacity-50 md:bg-opacity-0 text-lg lg:text-xl font-semibold text-white'>Exclusive offer. Get {discountValue}% off on purchase.</h2>
          <p className='bg-black bg-opacity-50 my-2 text-lg text-white group-hover:text-red-500 group-hover:underline'>{discountSlogan.length > 0 ? discountSlogan : `You can get ${discountValue}% off on Electronic Products. Click here and have a look at our Products around ${discountValue}% off.`}</p>
        </div>
      </section>
    </Link>
  )
}

export default ExclusiveOfferComponent;