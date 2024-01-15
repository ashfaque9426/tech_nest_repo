import React from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { calculateDiscountPercentage, formatNumberWithCommas, fromCamelCase } from '@/utils';
import ShowMoreBtn from '../ShowMoreBtn';
import cn from '@/lib/clsx/cn';

function CardComponentTwo({ productObj, className, classNameForSection, classNameForProductTitle, classNameForKeyFeatureContainer, classNameForKeyFeatureKeys, classNameForSavePercentageSection, classNameForBrandSection }) {
    const { _id, brand, productTitle, imgUrls, keyFeatures, regularPrice, price } = productObj;
    return (
        <article className={cn('h-full flex flex-col overflow-clip rounded-lg shadow-md hover:shadow-lg dark:shadow-none dark:bg-[#1e1e1e]', className)}>
            <figure className='overflow-clip relative border rounded-tl-lg rounded-tr-lg dark:border-none'>
                <small className={cn('absolute top-5 px-3 text-white font-bold bg-red-500 rounded-e-lg', classNameForSavePercentageSection)}>{calculateDiscountPercentage(regularPrice, price) > 0 && `Save ${calculateDiscountPercentage(regularPrice, price).toFixed(2)}%` }</small>
                <small className={cn('absolute px-3 py-1 bottom-5 right-5 bg-[#3d393f]  text-white font-bold rounded-lg', classNameForBrandSection)}>{brand}</small>
                <small className={cn('absolute px-3 py-1 bottom-5 bg-[#3d393f]  text-white font-bold rounded-e-lg', classNameForBrandSection)}>{formatNumberWithCommas(regularPrice)} BDT</small>
                <Image className='object-cover w-full h-full' src={imgUrls[0]} alt={`${productTitle} card image`} width={550} height={550} priority />
            </figure>
            <section className={cn('p-2 flex-1 flex flex-col justify-between gap-3', classNameForSection)}>
                <h3 className={cn('font-semibold', classNameForProductTitle)}>{productTitle}</h3>
                <ul className={cn('text-sm flex flex-col gap-1', classNameForKeyFeatureContainer)}>
                    {
                        Object.keys(keyFeatures).map(key => <li key={`featureListItem${uuidv4()}`}>
                            <span className={cn('capitalize font-semibold', classNameForKeyFeatureKeys)}>{fromCamelCase(key)}:</span>
                            <span className='ms-1'>{keyFeatures[key]}</span>
                        </li>)
                    }
                </ul>
                <ShowMoreBtn className='no-underline font-semibold px-2 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-white' url={`/singleProduct/${_id}`}>View Details</ShowMoreBtn>
            </section>
        </article>
    )
}

export default CardComponentTwo;