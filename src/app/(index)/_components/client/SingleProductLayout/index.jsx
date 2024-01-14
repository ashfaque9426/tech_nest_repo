"use client"
import React, { useEffect, useState } from 'react';
import { addQuestionForProduct, productById } from '@/services/productServices';
import SingleProductImgCarousel from '../SingleProductImgCarousel';
import { IoIosCart } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import KeyFeaturesComponent from '../../shared/server/KeyFeaturesComponent';
import BtnComponentOne from '../../server/BtnComponentOne';
import ProductSpecificationComponent from '../../server/ProductSpecificationComponent';
import ProductDescriptionComponent from '../../server/ProductDescriptionComponent';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import UsersQuestionsComponent from '../UsersQuestionsComponent';

function SingleProductLayout({ id }) {
    const [productData, setProductData] = useState(null);
    const [serverResMsg, setServerResMsg] = useState(null);
    const [viewQuestionFrom, setViewQuestionForm] = useState(false);
    const [questionsArr, setQuestionsArr] = useState([]);

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

        addQuestionForProduct(id, questionObj, userEmail).then(data => {
            if(data.success) {
                // refetching the data again on successfull question added to the server.
                setQuestionsArr(data.updatedDataArr);

                toast(data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast(data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }).catch(err => console.log(err.message));

        // console.log(questionObj);
        // resetting form data
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
                            <BtnComponentOne iconFirst={<FaCartPlus />} className='bg-[#ef4444] pe-8' >Add To Cart</BtnComponentOne>
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
                !serverResMsg && productData?.youtubeEmbedUrl.length > 0 && <section className='mt-12'>
                    <iframe width="100%" height="315" src={`${productData.youtubeEmbedUrl} + "&origin=http://localhost:3000&showinfo=0&video-id=youtube_video_id&enablejsapi=1&widgetid=1&color=white&modestbranding=1&rel=0"`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" sandbox='allow-same-origin allow-scripts allow-presentation' allowFullScreen={true}></iframe>
                </section>
            }

            {/* product questions section */}
            <section className='mt-24 mx-5 2xl:mx-0' role="region" aria-labelledby="section4Label">
                {
                    !serverResMsg && productData?.questions.length > 0 && <div>
                        <h2 id='section4LabelHeading' className='font-semibold text-[22px] md:text-2xl mb-8 md:text-center'>Questions related to {productData?.productTitle}.</h2>

                        {/* users questions component to view questions lists */}
                        <UsersQuestionsComponent usersQuestionsArr={questionsArr.length > 0 ? questionsArr : productData.questions} />
                    </div>
                }

                {/* User's Question Field */}
                <div className='mt-12'>
                    <form className={viewQuestionFrom ? 'block w-auto md:w-2/3 md:mx-auto':'hidden'} onSubmit={handleQuestionSubmit}>
                        <fieldset className='border border-black dark:border-white shadow-lg dark:shadow-none rounded-md p-5 flex flex-col gap-3'>
                            <legend className='font-bold'>User Question From</legend>
                            <section className='flex flex-col gap-1'>
                                <label className='font-semibold' htmlFor="userName">Provide User Name</label>
                                <input className='border border-black dark:text-black dark:border-white px-3 py-1 rounded-md' type="text" name="userName" id="userName" placeholder="Your Name(Optional)" autoComplete="username" />
                            </section>

                            <section className='flex flex-col gap-1'>
                                <label className='font-semibold' htmlFor="userEmail">Your Email*</label>
                                <input className='border border-black dark:text-black dark:border-white px-3 py-1 rounded-md' type="email" name="userEmail" id="userEmail" placeholder="Your Email" required autoComplete="email" />
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