import React from 'react'
import Image from 'next/image';
import { convertToBangladeshiDateTime, formatNumberWithCommas } from '@/utils';
import cn from '@/lib/clsx/cn';
import Link from 'next/link';

function CardComponentZero({ id, className, imgSrcUrl, altTextForImg, cardTitle, status, price, offer, date, points }) {
  return (
    <Link href={`/singleProduct/${id}`}>
      <article className={cn('overflow-clip shadow-md hover:shadow-lg dark:shadow-none transition-all duration-150 h-full flex flex-col cursor-pointer group bg-white dark:card-bg-dark', className)}>
        <figure className='relative overflow-clip'>
          {/* offers section */}
          {
            offer.length > 0 && <span className='absolute z-10 top-2 right-2 bg-red-500 text-white font-bold border border-red-500 rounded-xl px-3'>{offer.length > 0 && offer}</span>
          }

          {/* points section */}
          {
            points > 0 && <span className={`absolute z-10 ${offer.length > 0 ? 'top-10' : 'top-2'} right-2 bg-purple-900 px-3 rounded-xl font-bold text-white`}>Earn points {points}</span>
          }

          {/* Image section */}
          {
            imgSrcUrl.length > 0 ? <Image className='w-full object-cover group-hover:scale-110 transition-all duration-500 ease-in-out' src={imgSrcUrl} alt={altTextForImg} width={300}
              height={300} priority /> : <Image className='w-full object-cover' src='/images/noImageFoundPotrait.jpg' alt='No image found Thumbnail Image' width={300} height={300} priority />
          }

          {/* status section */}
          <span className={`absolute z-10 bottom-2 left-2 font-bold text-xl ${!imgSrcUrl.length > 0 ? 'text-black' : 'px-1 text-white bg-gray-700 bg-opacity-50'}`}>{status}</span>
        </figure>

        <section className='flex-1 flex flex-col justify-between border dark:border-none'>
          {/* card title */}
          <h3 className="px-3 pt-4 font-bold text-md mb-2 hover:text-red-500 hover:underline">{cardTitle}</h3>

          {/* card content */}
          <div className="px-3 py-4 flex justify-between items-center gap-2">
            <p className='text-red-500 font-semibold flex flex-col shrink-0'>{formatNumberWithCommas(price)} <span>BDT only</span></p>
            <p className='text-right'>{convertToBangladeshiDateTime(date)}</p>
          </div>
        </section>
      </article>
    </Link>
    
  )
}

export default CardComponentZero;