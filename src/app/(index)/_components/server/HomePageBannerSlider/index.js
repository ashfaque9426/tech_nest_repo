"use client"
import React, { useEffect, useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

function HomePageBannerSlider({ success, dataArr, message }) {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [sliderHeight, setSliderHeight] = useState(0);

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };


    // updating the window width change while monitoring client resizing.
    useEffect(() => {
        // handling the not properly not ready while accessing issue.
        const handleResize = () => {
            setTimeout(updateWindowWidth, 0);
        }

        // Add event listener on component mount
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
        }

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(()=> {
        // setting dynamic height to carousel slider component based on different window width
        if (windowWidth < 768) {
            setSliderHeight(125);
        }
        else if (windowWidth > 1901) {
            setSliderHeight(40);
        }
        else {
            setSliderHeight(55);
        }
    }, [windowWidth, dataArr]);

    return (
        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={sliderHeight}
            totalSlides={dataArr?.length || 1}
            interval={5000}
            isPlaying={true}
            className='relative'
        >
            {/* in case for server error while fetching data */}
            {
                !success && <Slide index={0}>
                    <div className='relative z-20 h-full flex justify-center items-center px-5 md:px-16'>
                        <h1 className='text-2xl md:text-3xl'>Unable to retrieve the product from server. Response Message: {message && message}</h1>
                    </div>
                </Slide>
            }

            {/* if data fetching is successfull. */}
            {
                success && dataArr?.length > 0 && <Slider>
                    {
                        dataArr.map((dataObj, i) => (
                            <Slide key={`homePageSlider${uuidv4()}`} index={i}>
                                {/* for background image */}
                                <Image className='absolute top-0 right-0 bottom-0 left-0 object-cover object-center w-full h-full z-0' src={`${dataObj.bgImgUrl}`} alt='Backgorund Image' width={750} height={750} priority />

                                {/* for overlay on top of background. */}
                                <div className='absolute top-0 right-0 bottom-0 left-0 z-10 bg-black bg-opacity-55 dark:bg-opacity-75'></div>

                                {/* actual slider component with data */}
                                <div id="banner" className={`relative text-white h-full flex flex-col md:flex-row justify-center items-center gap-5 px-5 z-20 md:px-16 ${sliderHeight === 40 && 'w-[80%] mx-auto'}`}>
                                    <small className='absolute top-5 right-5 text-red-500 font-semibold'>Slide Number {i + 1} of {dataArr.length}</small>

                                    {/* if no product image is available to show. */}
                                    {
                                        dataObj.productImgUrl.length === 0 && <header className='w-full flex flex-col justify-center items-center gap-3'>
                                            <h1 id="bannerTitle" className='text-2xl md:text-3xl'>{dataObj.bannerTitle}</h1>
                                            <h2 id="bannerSubtitle" className='text-lg text-yellow-500'>{dataObj.bannerSubtitle}</h2>
                                        </header>
                                    }

                                    {/* if product image url is available to show. did't check for background image because background image and product title and so do product subtitle are mandatory. */}
                                    {
                                        dataObj.productImgUrl.length > 0 && <>
                                            <header className='md:w-1/2 flex flex-col gap-3'>
                                                <h1 id="bannerTitle" className='text-2xl md:text-3xl'>{dataObj.bannerTitle}</h1>
                                                <h2 id="bannerSubtitle" className='text-lg text-yellow-500'>{dataObj.bannerSubtitle}</h2>
                                            </header>
                                            <figure className='md:flex-1 flex justify-center items-center'>
                                                <Image className='object-contain w-full h-full' src={dataObj.productImgUrl} alt={`Banner image ${i + 1} of ${dataObj.bannerTitle}`} width={500} height={500} priority />
                                            </figure>
                                        </>
                                    }
                                </div>
                            </Slide>
                        ))
                    }
                </Slider>
            }
            {
                success && dataArr.length > 0 && <>
                    <ButtonBack className='absolute top-1/2 left-2 bg-black bg-opacity-15 hover:bg-opacity-100 text-white dark:bg-yellow-600 dark:bg-opacity-15 dark:hover:bg-opacity-100 px-3 py-1 rounded-full text-lg cursor-pointer'><GrLinkPrevious /></ButtonBack>
                    <ButtonNext className='absolute top-1/2 right-2 bg-black bg-opacity-15 hover:bg-opacity-100 text-white dark:bg-yellow-600 dark:bg-opacity-15 dark:hover:bg-opacity-100 px-3 py-1 rounded-full text-lg cursor-pointer'><GrLinkNext /></ButtonNext>
                </>
            }
        </CarouselProvider>
    )
}

export default HomePageBannerSlider;