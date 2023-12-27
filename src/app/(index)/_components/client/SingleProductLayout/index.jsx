"use client"
import React, { useEffect, useState } from 'react';
import { productById } from '@/services/productServices';
import SingleProductImgCarousel from '../SingleProductImgCarousel';
import { IoIosCart } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import KeyFeaturesComponent from '../../server/KeyFeaturesComponent';
import BtnComponentOne from '../../server/BtnComponentOne';
import ProductSpecificationComponent from '../../server/ProductSpecificationComponent';

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
            {/* product title */}
            {
                serverResMsg && <h5 className='my-5 text-lg text-center font-bold'>{serverResMsg}</h5>
            }

            {/* key features section */}
            {
                !serverResMsg && productData?.keyFeatures && <section className='flex flex-col lg:flex-row gap-5'>
                    {/* image section component */}
                    <SingleProductImgCarousel className='lg:w-1/2' imgSrcArr={productData?.imgUrls} />

                    {/* product details section */}
                    <section className='flex-1 px-5 xl:px-12'>
                        {/* product heading */}
                        <h2 className='font-semibold text-2xl my-5'>{productData?.productTitle}</h2>

                        {
                            productData?.points && <p className='my-5 text-xl'><span className='font-semibold'>Earn:</span> {productData.points} points</p>
                        }

                        {/* key features of the product display section */}
                        {
                            Object.keys(productData.keyFeatures).length > 0 && <KeyFeaturesComponent keyFeaturesObj={productData.keyFeatures} price={productData?.price} regularPrice={productData?.regularPrice} />
                        }

                        {/* Buttons section for several actions */}
                        <section className='flex flex-wrap gap-5'>
                            <BtnComponentOne iconFirst={<IoIosCart />} className='pe-8'>Buy Now</BtnComponentOne>
                            <BtnComponentOne iconFirst={<FaCartPlus />} className='bg-[#ef4444] pe-8' >Add To Cart</BtnComponentOne>
                        </section>
                    </section>
                </section>
            }

            {/* product specification details section */}
            {
                !serverResMsg && productData?.productSpecifications.length > 0 && <section className='mt-24'>
                    <h2 className='font-semibold text-2xl mb-5 text-center'>Product&apos;s Specification details down bellow</h2>

                    {/* product's specificaiton component */}
                    <ProductSpecificationComponent ProductSpecificationsArr={productData.productSpecifications} />
                </section>
            }
        </main>
    )
}

export default SingleProductLayout;