import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import KeyFeaturesComponent from '../KeyFeaturesComponent';
import cn from '@/lib/clsx/cn';
import { formatNumberWithCommas } from '@/utils';

function CardComponentOne({id, className, imgSrcUrl, imgAltText, cardTitle, keyFeatures, regularPrice, price, status, offer }) {
    return (
        <Link href={`/singleProduct/${id}`}>
            <article className={cn('overflow-clip shadow-md hover:shadow-lg dark:shadow-none transition-all duration-150 h-full flex flex-col cursor-pointer group bg-white dark:card-bg-dark rounded-lg', className)}>
                <figure className='overflow-clip'>
                    {
                        imgSrcUrl.length > 0 ? <Image className='w-full object-cover group-hover:scale-110 transition-all duration-500 ease-in-out' src={imgSrcUrl} alt={imgAltText} width={300}
                            height={300} priority /> : <Image className='w-full object-cover' src='/images/noImageFoundPotrait.jpg' alt='No image found Thumbnail Image' width={300} height={300} priority />
                    }
                </figure>
                <section className='flex-1 p-3 flex flex-col justify-between'>
                    {/* heading and key features sectin */}
                    <div className='flex flex-1 flex-col gap-8'>
                        <h2 className='font-bold text-lg'>{cardTitle}</h2>
                        <section className='flex flex-1 flex-col justify-center'>
                            {
                                Object.keys(keyFeatures).length > 0 && <KeyFeaturesComponent keyFeaturesObj={keyFeatures} classNameForTitle="mb-2 text-lg" classNameForFeatures="gap-1 mb-5" classNameForListItem="text-md" />
                            }
                        </section>
                    </div>

                    {/* status and offer section */}
                    <div className='flex flex-1 flex-col justify-center'>
                        <p><span className='font-semibold text-lg'>Status:</span> <span className='text-md'>{status}</span></p>
                        {
                            offer?.length > 0 && <p><span className='font-semibold text-lg'>Offer:</span> <span className='text-md'>{offer}</span></p>
                        }
                    </div>

                    {/* price and discount section */}
                    <div className='flex flex-col md:flex-row md:gap-2 mt-5'>
                        <p><span className='font-semibold text-lg'>Price:</span> <span className='text-md'>{formatNumberWithCommas(price)} BDT Only</span></p>
                        <span className='hidden lg:block text-lg font-semibold'>/</span>
                        <p><span className='lg:hidden text-lg font-semibold'>Not</span> <span className='line-through text-md'>{formatNumberWithCommas(regularPrice)} BDT Only</span></p>
                    </div>
                </section>
            </article>
        </Link>
    )
}

export default CardComponentOne;