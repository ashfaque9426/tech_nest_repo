import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import KeyFeaturesComponent from '../KeyFeaturesComponent';
import cn from '@/lib/clsx/cn';
import { formatNumberWithCommas } from '@/utils';

function CardComponentOne({id, className, imgSrcUrl, imgAltText, cardTitle, keyFeatures, regularPrice, price, status, offer }) {
    return (
        <Link href={`/singleProduct/${id}`}>
            <article className={cn('overflow-clip shadow-md hover:shadow-lg dark:shadow-none transition-all duration-150 h-full flex flex-col cursor-pointer group bg-[#f8f5f5] dark:card-bg-dark rounded-lg group', className)}>
                <figure className='overflow-clip'>
                    {
                        imgSrcUrl.length > 0 ? <Image className='w-full object-cover group-hover:scale-110 transition-all duration-500 ease-in-out' src={imgSrcUrl} alt={imgAltText} width={300}
                            height={300} priority /> : <Image className='w-full object-cover' src='/images/noImageFoundPotrait.jpg' alt='No image found Thumbnail Image' width={300} height={300} priority />
                    }
                </figure>
                <section className='flex-1 px-3 py-5 flex flex-col justify-between gap-5'>
                    {/* card heading */}
                    <h2 className='font-bold text-lg group-hover:underline group-hover:text-red-500'>{cardTitle}</h2>

                    {/* key features section */}
                    <section className='flex flex-col justify-center'>
                        {
                            Object.keys(keyFeatures).length > 0 && <KeyFeaturesComponent keyFeaturesObj={keyFeatures} classNameForTitle="mb-2 text-base" classNameForFeatures="gap-1" classNameForListItem="text-sm" />
                        }
                    </section>

                    {/* status and offer section */}
                    <div className='flex flex-col justify-center'>
                        <p className='text-base'><span className='font-semibold'>Status:</span> <span className='text-sm'>{status}</span></p>
                        {
                            offer?.length > 0 && <p className='text-base'><span className='font-semibold'>Offer:</span> <span className='text-yellow-700 dark:text-yellow-500 text-sm'>{offer}</span></p>
                        }
                    </div>

                    {/* price and discount section */}
                    <div className='flex flex-col md:flex-row md:gap-2'>
                        <p><span className='font-semibold text-base'>Price:</span> <span className='text-red-500 text-sm'>{formatNumberWithCommas(price)} BDT Only</span></p>
                        <p><span className='text-base font-semibold'>Not</span> <span className='line-through text-sm'>{formatNumberWithCommas(regularPrice)} BDT Only</span></p>
                    </div>
                </section>
            </article>
        </Link>
    )
}

export default CardComponentOne;