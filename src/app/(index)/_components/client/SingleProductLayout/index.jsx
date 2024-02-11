// import React, { useEffect, useState } from 'react';
import { productById } from '@/services/productServices';
import SingleProductImgCarousel from '../SingleProductImgCarousel';
import { IoIosCart } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import KeyFeaturesComponent from '../../shared/server/KeyFeaturesComponent';
import BtnComponentOne from '../../server/BtnComponentOne';
import ProductSpecificationComponent from '../../server/ProductSpecificationComponent';
import ProductDescriptionComponent from '../../server/ProductDescriptionComponent';
import ProductQestionSectionComponent from '../ProductQestionSectionComponent';

async function SingleProductLayout({ id }) {
    const { success, data: productData, message: serverResMsg } = await productById(id);
    
    return (
        <main role='main' aria-labelledby='subMainContentLabel'>
            {/* product title */}
            {
                serverResMsg && <h5 className='my-5 text-lg text-center font-bold'>{serverResMsg}</h5>
            }

            {/* key features section */}
            {
                !serverResMsg && productData?.keyFeatures && <section className='flex flex-col lg:flex-row gap-5' role="region" aria-labelledby="section1Label">
                    {/* product's image viewer section component */}
                    <SingleProductImgCarousel className='lg:w-1/2' imgSrcArr={productData?.imgUrls} />

                    {/* product details section */}
                    <section className='flex-1 px-5 xl:px-12' aria-labelledby="subsection1Label">
                        {/* product heading */}
                        <h2 id='subsection1LabelHeading' className='font-semibold text-2xl my-5'>{productData?.productTitle}</h2>

                        {
                            productData?.points > 0 && <p className='my-5 text-xl'><span className='font-semibold'>Earn:</span> {productData.points} points</p>
                        }

                        {/* key features of the product display section */}
                        {
                            Object.keys(productData.keyFeatures).length > 0 && <KeyFeaturesComponent keyFeaturesObj={productData.keyFeatures} price={productData?.price} regularPrice={productData?.regularPrice} />
                        }

                        {/* Buttons section for several actions */}
                        <section className='flex flex-wrap gap-5' aria-labelledby="subsection2Label">
                            <BtnComponentOne iconFirst={<IoIosCart />} className='pe-8'>Buy Now</BtnComponentOne>
                            <BtnComponentOne iconFirst={<FaCartPlus />} className='bg-[#a43434] pe-8' >Add To Cart</BtnComponentOne>
                        </section>
                    </section>
                </section>
            }

            {/* product specification details section */}
            {
                !serverResMsg && productData?.productSpecifications.length > 0 && <section className='mt-24 mx-5 2xl:mx-0' role="region" aria-labelledby="section2Label">
                    <h2 id='section2LabelHeading' className='font-semibold text-[22px] md:text-2xl mb-5 md:text-center'>Product&apos;s Specification details down bellow</h2>

                    {/* product's specificaiton component */}
                    <ProductSpecificationComponent ProductSpecificationsArr={productData.productSpecifications} />
                </section>
            }

            {/* product description section */}
            {
                !serverResMsg && productData?.productDescriptions.length > 0 && <section className='mt-24 mx-5 dark:mx-0 2xl:mx-0' role="region" aria-labelledby="section3Label">
                    <h2 id='section3LabelHeading' className='font-semibold text-[22px] md:text-2xl mb-5 md:text-center dark:mx-5'>Product&apos;s Descriptions down bellow</h2>

                    {/* product description component */}
                    <ProductDescriptionComponent productDescriptionArr={productData.productDescriptions} />
                </section>
            }

            {/* Youtube Iframe section */}
            {
                !serverResMsg && productData?.youtubeEmbedUrl?.length > 0 && <section className='mt-12'>
                    <iframe width="100%" height="315" src={`${productData.youtubeEmbedUrl} + "&origin=http://localhost:3000&showinfo=0&video-id=youtube_video_id&enablejsapi=1&widgetid=1&color=white&modestbranding=1&rel=0"`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" sandbox='allow-same-origin allow-scripts allow-presentation' allowFullScreen={true}></iframe>
                </section>
            }

            {/* product questions section */}
            <ProductQestionSectionComponent id={id} productData={productData} serverResMsg={serverResMsg} />
            
        </main>
    )
}

export default SingleProductLayout;