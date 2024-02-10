import React from 'react'
import CardComponentZero from '../CardComponentZero';
import { v4 as uuidv4 } from 'uuid';
import cn from '@/lib/clsx/cn';
import Image from 'next/image';
import { productByCategory, getProductsByBrandName, getProductsByModelName } from '@/services/productServices';

async function CardSectionComponentForSections({ title, category, brand, model, limit, limit1, limit2, className, classNameForHeading }) {
    const { data: dataArr } = await productByCategory(category, limit);
    const { data: dataArr1 } = dataArr?.length === 0 && await getProductsByBrandName(brand, limit1);
    const { data: dataArr2 } = dataArr?.length === 0 && dataArr1?.length === 0 && await getProductsByModelName(model, limit2);

    return (
        <section className={cn('pb-12', className)}>
            <h2 className={cn(classNameForHeading)}>{title}:</h2>
            {/* product data here */}
            {
                dataArr?.length > 0 && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5 lg:gap-3'>
                    {
                        dataArr.map(dataObj => (

                            <CardComponentZero key={`uniqueKeyForCardCompZero${uuidv4()}`} id={dataObj?._id} imgSrcUrl={dataObj?.imgUrls.length > 0 ? dataObj?.imgUrls[0] : ""} altTextForImg={`${dataObj?.brand} ${dataObj?.productCategory} image`} cardTitle={dataObj?.productTitle} status={dataObj?.productStatus} price={dataObj?.price} points={dataObj?.points} offer={dataObj?.offer} date={dataObj?.createdAt} />

                        ))
                    }
                </div>
            }
            {
                dataArr1?.length > 0 && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5 lg:gap-3'>
                    {
                        dataArr1.map(dataObj => (

                            <CardComponentZero key={`uniqueKeyForCardCompZero${uuidv4()}`} id={dataObj?._id} imgSrcUrl={dataObj?.imgUrls.length > 0 ? dataObj?.imgUrls[0] : ""} altTextForImg={`${dataObj?.brand} ${dataObj?.productCategory} image`} cardTitle={dataObj?.productTitle} status={dataObj?.productStatus} price={dataObj?.price} points={dataObj?.points} offer={dataObj?.offer} date={dataObj?.createdAt} />

                        ))
                    }
                </div>
            }
            {
                dataArr2?.length > 0 && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5 lg:gap-3'>
                    {
                        dataArr2.map(dataObj => (

                            <CardComponentZero key={`uniqueKeyForCardCompZero${uuidv4()}`} id={dataObj?._id} imgSrcUrl={dataObj?.imgUrls.length > 0 ? dataObj?.imgUrls[0] : ""} altTextForImg={`${dataObj?.brand} ${dataObj?.productCategory} image`} cardTitle={dataObj?.productTitle} status={dataObj?.productStatus} price={dataObj?.price} points={dataObj?.points} offer={dataObj?.offer} date={dataObj?.createdAt} />

                        ))
                    }
                </div>
            }
            
            {/* loading gif here */}
            {
                dataArr?.length === 0 && <div className='flex justify-center items-center py-28'>
                    <Image src="/gifs/DoubleRing-1s-200px.gif" alt='Loading Gif' height={150} width={150} priority />
                </div>
            }
            {
                dataArr1?.length === 0 && <div className='flex justify-center items-center py-28'>
                    <Image src="/gifs/DoubleRing-1s-200px.gif" alt='Loading Gif' height={150} width={150} priority />
                </div>
            }
            {
                dataArr2?.length === 0 && <div className='flex justify-center items-center py-28'>
                    <Image src="/gifs/DoubleRing-1s-200px.gif" alt='Loading Gif' height={150} width={150} priority />
                </div>
            }
        </section>
    )
}

export default CardSectionComponentForSections;