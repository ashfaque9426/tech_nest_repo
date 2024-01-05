"use client"
import React, { useEffect, useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

function HomePageBannerSlider({ dataArr }) {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [sliderHeight, setSliderHeight] = useState(0);

    useEffect(()=> {
        setWindowWidth(window.innerWidth);
        if(windowWidth < 768) {
            setSliderHeight(125);
        }else {
            setSliderHeight(55);
        }
    }, [windowWidth, dataArr]);

    return (
        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={sliderHeight}
            totalSlides={dataArr?.length}
            interval={5000}
            isPlaying={true}
            className='relative'
        >
            {
                dataArr?.length > 0 && <Slider>
                    {
                        dataArr.map((dataObj, i) => (
                            <Slide key={`homePageSlider${uuidv4()}`} index={i}>
                                {/* for background image */}
                                <Image className='absolute top-0 right-0 bottom-0 left-0 object-cover object-center w-full h-full z-0' src={`${dataObj.bgImgUrl}`} alt='Backgorund Image' width={750} height={750} priority />

                                {/* for overlay on top of background. */}
                                <div className='absolute top-0 right-0 bottom-0 left-0 z-10 bg-black bg-opacity-55 dark:bg-opacity-75'></div>

                                {/* actual slider component with data */}
                                <div className='relative text-white h-full flex flex-col md:flex-row justify-center items-center gap-5 px-5 z-20 md:px-16'>
                                    {
                                        dataObj.productImgUrl.length === 0 && <header className='w-full flex flex-col justify-center items-center gap-3'>
                                            <h1 className='text-2xl md:text-3xl'>{dataObj.bannerTitle}</h1>
                                            <h2 className='text-lg'>{dataObj.bannerSubtitle}</h2>
                                        </header>
                                    }
                                    {
                                        dataObj.productImgUrl.length > 0 && <>
                                            <header className='md:w-1/2 flex flex-col gap-3'>
                                                <h1 className='text-2xl md:text-3xl'>{dataObj.bannerTitle}</h1>
                                                <h2 className='text-lg'>{dataObj.bannerSubtitle}</h2>
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
            <ButtonBack className='absolute top-1/2 left-2 bg-black bg-opacity-15 hover:bg-opacity-100 text-white dark:bg-yellow-600 dark:bg-opacity-15 dark:hover:bg-opacity-100 px-3 py-1 rounded-full text-lg cursor-pointer'><GrLinkPrevious /></ButtonBack>
            <ButtonNext className='absolute top-1/2 right-2 bg-black bg-opacity-15 hover:bg-opacity-100 text-white dark:bg-yellow-600 dark:bg-opacity-15 dark:hover:bg-opacity-100 px-3 py-1 rounded-full text-lg cursor-pointer'><GrLinkNext /></ButtonNext>
        </CarouselProvider>
    )
}

export default HomePageBannerSlider;