"use client"
import React, { useEffect, useState } from 'react';
import { productById } from '@/services/productServices';
import SingleProductImgCarousel from '../SingleProductImgCarousel';
import { calculateDiscountPercentage, formatNumberWithCommas, fromCamelCase } from '@/utils';

function SingleProductLayout({ id }) {
    const [productData, setProductData] = useState(null);
    const [serverResMsg, setServerResMsg] = useState(null);

    useEffect(() => {
        // setting up the retrived data from server to setProduct data route.
        productById(id).then(result => {
            setProductData(result.data);
            setServerResMsg(result?.message);
            // console.log(result.data)
        });
    }, [id]);
    return (
        <main className='w-auto 2xl:w-2/3 mx-auto' role='main'>
            {
                serverResMsg && <h5 className='my-5 text-lg text-center font-bold'>{serverResMsg}</h5>
            }
            {
                !serverResMsg && productData && <section className='flex flex-wrap'>
                    {/* image section component */}
                    <SingleProductImgCarousel className='h-[550px]' imgSrcArr={productData?.imgUrls} />

                    {/* product details section */}
                    <section className='flex-1 px-5 xl:px-20'>
                        {/* product heading */}
                        <h2 className='font-semibold text-2xl my-5'>Product detail section</h2>

                        {
                            productData.points && <p className='my-5 text-xl'><span className='font-semibold'>Earn:</span> {productData.points} points</p>
                        }

                        {/* key features of the product display section */}
                        {
                            Object.keys(productData?.keyFeatures).length > 0 && <div>
                                <h2 className='text-lg font-semibold mb-5 underline'>Key Features:</h2>

                                {/* key features lists by iterating keyFeatures object */}
                                <ul className='flex flex-col gap-3'>
                                    {
                                        Object.keys(productData.keyFeatures).map(key => <li key={key}>
                                            <span className='capitalize font-semibold'>{fromCamelCase(key)}</span>: <span>{productData.keyFeatures[key]}</span>
                                        </li>)
                                    }
                                </ul>

                                {/* price and discount section */}
                                <section className='my-5 flex flex-col gap-3'>
                                    <div className='flex flex-wrap gap-3'>
                                        <p><span className='font-semibold'>Price:</span> {formatNumberWithCommas(productData?.price)} BDT Only</p>
                                        <p><span className='font-semibold'>Regular Price:</span> <span className='line-through'>{formatNumberWithCommas(productData?.regularPrice)}  BDT Only</span></p>
                                    </div>
                                    <p className='text-2xl font-bold'>{calculateDiscountPercentage(productData?.regularPrice, productData.price ).toFixed(2)}% Off</p>
                                </section>

                                {/* Buttons section for several actions */}
                                <section className='flex flex-wrap gap-5'>
                                    <button className='text-lg font-semibold bg-red-500 px-3 py-1 rounded-lg cursor-pointer'>Buy Now</button>
                                    <button className='text-lg font-semibold bg-red-500 px-3 py-1 rounded-lg cursor-pointer'>Add to Cart</button>
                                </section>
                            </div>
                        }
                    </section>
                </section>
            }
        </main>
    )
}

export default SingleProductLayout;