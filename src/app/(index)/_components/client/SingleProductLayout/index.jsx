"use client"
import React, { useEffect, useState } from 'react';
import { productById } from '@/services/productServices';
import SingleProductImgCarousel from '../SingleProductImgCarousel';
import { IoIosCart } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import KeyFeaturesComponent from '../../server/KeyFeaturesComponent';
import BtnComponentOne from '../../server/BtnComponentOne';
import ProductSpecificationComponent from '../../server/ProductSpecificationComponent';
import ProductDescriptionComponent from '../../server/ProductDescriptionComponent';
import { v4 as uuidv4 } from 'uuid';

function SingleProductLayout({ id }) {
    const [productData, setProductData] = useState(null);
    const [serverResMsg, setServerResMsg] = useState(null);
    const [viewQuestionFrom, setViewQuestionForm] = useState(false);

    const handleQuestionSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const userName = form.userName.value;
        const userEmail = form.userEmail.value;
        const usersQuestion = form.usersQuestion.value;

        const questionObj = {
            qid: `questionID${uuidv4()}`,
            userName: userName.length > 0 ? userName : 'Unknown User',
            userEmail: userEmail,
            usersQuestions: [{ question: usersQuestion, ansswer: '' }]
        }

        console.log(questionObj);
        form.reset();
        setViewQuestionForm(false);
    }

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
                    {/* product's image viewer section component */}
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
                    <h2 className='mx-5 md:mx-auto font-semibold text-2xl mb-5 md:text-center'>Product&apos;s Specification details down bellow</h2>

                    {/* product's specificaiton component */}
                    <ProductSpecificationComponent ProductSpecificationsArr={productData.productSpecifications} />
                </section>
            }

            {/* product description section */}
            {
                !serverResMsg && productData?.productDescriptions.length > 0 && <section className='mt-24'>
                    <h2 className='mx-5 md:mx-auto font-semibold text-2xl mb-5 md:text-center'>Product&apos;s Descriptions down bellow</h2>

                    {/* product description component */}
                    <ProductDescriptionComponent productDescriptionArr={productData.productDescriptions} />
                </section>
            }

            {/* product questions section */}
            <section className='mt-24'>
                {
                    !serverResMsg && productData?.questions.length > 0 && <div>
                        <h2 className='mx-5 md:mx-auto font-semibold text-2xl mb-5 md:text-center'>Questions related to {productData?.productTitle}.</h2>
                    </div>
                }

                {/* User's Question Field */}
                <div className='mx-5 md:mx-auto'>
                    <form className={viewQuestionFrom ? 'block':'hidden'} onSubmit={handleQuestionSubmit}>
                        <fieldset className='border border-black dark:border-white shadow-lg dark:shadow-none rounded-sm px-3 py-5 flex flex-col gap-3 w-auto md:w-2/3'>
                            <legend className='font-bold'>User Question From</legend>
                            <section className='flex flex-col gap-1'>
                                <label className='font-semibold' htmlFor="userName">Provide User Name</label>
                                <input className='border border-black dark:text-black dark:border-white px-3 py-1 rounded-md' type="text" name="userName" id="userName" placeholder="Your Name(Optional)" />
                            </section>

                            <section className='flex flex-col gap-1'>
                                <label className='font-semibold' htmlFor="userEmail">Your Email*</label>
                                <input className='border border-black dark:text-black dark:border-white px-3 py-1 rounded-md' type="text" name="userEmail" id="userEmail" placeholder="Your Email" required />
                            </section>

                            <section className='flex flex-col gap-1'>
                                <label className='font-semibold' htmlFor="usersQuestion">Your Question*</label>
                                <textarea className='border border-black dark:text-black dark:border-white px-3 py-1 rounded-md' name="usersQuestion" id="usersQuestion" cols="10" rows="5" placeholder="Provide Your Question" required ></textarea>
                            </section>
                        </fieldset>

                        <input className='px-3 py-1 text-white bg-[#585657] rounded-lg my-3' type="submit" value="Submit" />
                    </form>
                    <div className={!viewQuestionFrom ? 'flex justify-center' : 'hidden'}>
                        <BtnComponentOne onClickFunc={() => setViewQuestionForm(true)}>Add a Question?</BtnComponentOne>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default SingleProductLayout;