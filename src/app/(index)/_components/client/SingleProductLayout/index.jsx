"use client"
import React, { useEffect, useState } from 'react';
import { productById } from '@/services/productServices';
import SingleProductImgCarousel from '../SingleProductImgCarousel';
import { calculateDiscountPercentage, formatNumberWithCommas, fromCamelCase } from '@/utils';
import KeyFeaturesComponent from '../../server/KeyFeaturesComponent';

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
        <main className='w-auto md:mx-5 xl:w-2/3 xl:mx-auto' role='main'>
            {
                serverResMsg && <h5 className='my-5 text-lg text-center font-bold'>{serverResMsg}</h5>
            }
            {
                !serverResMsg && productData && <section className='flex flex-col lg:flex-row gap-5'>
                    {/* image section component */}
                    <SingleProductImgCarousel className='lg:w-1/2' imgSrcArr={productData?.imgUrls} />

                    {/* product details section */}
                    <section className='flex-1 px-5 xl:px-12'>
                        {/* product heading */}
                        <h2 className='font-semibold text-2xl my-5'>{productData?.productTitle}</h2>

                        {
                            productData.points && <p className='my-5 text-xl'><span className='font-semibold'>Earn:</span> {productData.points} points</p>
                        }

                        {/* key features of the product display section */}
                        {
                            Object.keys(productData?.keyFeatures).length > 0 && <KeyFeaturesComponent productData={productData} />
                        }

                        {/* Buttons section for several actions */}
                        <section className='flex flex-wrap gap-5'>
                            <button className='text-lg font-semibold bg-red-500 px-3 py-1 rounded-lg cursor-pointer'>Buy Now</button>
                            <button className='text-lg font-semibold bg-red-500 px-3 py-1 rounded-lg cursor-pointer'>Add to Cart</button>
                        </section>
                    </section>
                </section>
            }
        </main>
    )
}

export default SingleProductLayout;