import React from 'react'
import Image from 'next/image';
import { convertToBangladeshiDateTime, formatNumberWithCommas } from '@/utils';
import cn from '@/lib/clsx/cn';

function CardComponentZero({ className, imgSrcUrl, altTextForImg, cardTitle, status, price, offer, date, points }) {
  return (
    <article className={cn('overflow-hidden shadow-md h-full cursor-pointer', className)}>
      <figure className='relative overflow-hidden'>
        {/* offers section */}
        {
          offer.length > 0 && <>
            <span className='absolute top-2 right-2 bg-red-500 text-white font-bold border border-red-500 rounded-xl px-3'>{offer.length > 0 && offer}</span>
          </>
        }

        {/* points section */}
        <span className={`absolute ${offer.length > 0 ? 'top-10' : 'top-2'} right-2 bg-purple-900 px-3 rounded-xl font-bold text-white`}>Earn points {points && points}</span>

        {/* Image section */}
        {
          imgSrcUrl.length > 0 ? <Image className='w-full object-cover' src={imgSrcUrl} alt={altTextForImg} width={300}
            height={300} priority /> : <Image className='w-full object-cover' src='/images/noImageFoundPotrait.jpg' alt='No image found Thumbnail Image' width={300} height={300} priority />
        }

        {/* status section */}
        <span className={`absolute top-2 left-2 font-bold text-xl ${!imgSrcUrl.length > 0 ? 'text-black' : 'text-white' }`}>{status}</span>
      </figure>

      {/* card title */}
      <h3 className="px-6 pt-4 font-bold text-xl mb-2">{cardTitle}</h3>

      {/* card content */}
      <div className="px-6 pt-4 pb-4 flex justify-between items-center gap-2">
        <span className='text-red-500 font-semibold'>{formatNumberWithCommas(price)} BDT only</span>
        <span className='text-right'>{convertToBangladeshiDateTime(date)}</span>
      </div>
    </article>
  )
}

export default CardComponentZero;