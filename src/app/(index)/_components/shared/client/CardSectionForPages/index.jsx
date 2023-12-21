"use client"
import React, { useEffect, useState } from 'react'
import CardComponentZero from '../../server/CardComponentZero';
import { v4 as uuidv4 } from 'uuid';
import cn from '@/lib/clsx/cn';
import Image from 'next/image';
import { document } from 'postcss';

function CardSectionForPages({ title, fetchData, className, classNameForHeading }) {
    const [dataArr, setDataArr] = useState([]);
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        if(localStorage.getItem('theme') && localStorage.getItem('theme') === 'dark') {
            setTheme('dark')
        }

        if (localStorage.getItem('theme') && localStorage.getItem('theme') === 'light') {
            setTheme('light');
        }

        fetchData.then(data => {
            setDataArr(data.data);
            // console.log(data.data);
        })
    }, [fetchData]);

    return (
        <section className={cn('pb-12', className)}>
            <h2 className={cn('mx-5', classNameForHeading)}>{title}</h2>
            {/* product data here */}
            {
                dataArr?.length > 0 && <div className='mx-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:mx-auto 2xl:grid-cols-5 gap-3'>
                    {
                        dataArr.map(dataObj => (

                            <CardComponentZero key={`uniqueKeyForCardCompZero${uuidv4()}`} id={dataObj?._id} imgSrcUrl={dataObj?.imgUrls.length > 0 ? dataObj?.imgUrls[0] : ""} altTextForImg={`${dataObj?.brand} ${dataObj?.productCategory} image`} cardTitle={dataObj?.productTitle} status={dataObj?.productStatus} price={dataObj?.price} points={dataObj?.points} offer={dataObj?.offer} date={dataObj?.createdAt} />

                        ))
                    }
                </div>
            }
            
            {/* loading gif here */}
            {
                dataArr?.length === 0 ? theme === 'dark' ? <div className='flex justify-center items-center py-28'>
                    <Image src="/gifs/Spinner-1s-200pxRed.gif" alt='Loading Gif' height={150} width={150} priority />
                </div> 
                : 
                <div className='flex justify-center items-center py-28'>
                    <Image src="/gifs/Double Ring-1s-200px.gif" alt='Loading Gif' height={150} width={150} priority />
                </div>
                : ''
            }
        </section>
    )
}

export default CardSectionForPages;