"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import cn from '@/lib/clsx/cn';

function SingleProductImgCarousel({ imgSrcArr, className }) {
    const [imgSrc, setImgSrc] = useState(imgSrcArr[0]);
    const handleSrcChange = e => {
        // console.log(e.target.src);
        setImgSrc(e.target.src);
    }
    return (
        <>
            {/* if image array prop is empty */}
            {
                imgSrcArr.length === 0 && <figure className={cn('overflow-clip', className)}>
                    <Image className='object-cover w-auto h-auto' src='/images/noImageFoundPotrait.jpg' alt='Product Preview Image not found' width={500} height={500} priority />
                </figure>
            }

            {/* if image array prop with image urls */}
            {
                imgSrcArr.length > 0 && <section className={cn('flex flex-col gap-5', className)}>
                    <figure className='overflow-clip md:h-[555px] lg:h-[475px] flex justify-center'>
                        <Image className='object-contain w-full' src={imgSrc} alt='Product Image Preview' width={500} height={0} priority />
                    </figure>
                    {
                        <div className='flex flex-wrap justify-center gap-2'>
                            {
                                imgSrcArr.map(imgSrc => <Image className='w-[50px] h-auto md:w-[75px] 2xl:w-[95px] object-cover cursor-pointer' key={`ImageComponent${uuidv4()}`} src={imgSrc} alt='thumbnail image' width={150} height={150} onClick={handleSrcChange} />)
                            }
                        </div>
                    }
                </section>
            }
        </>

    )
}

export default SingleProductImgCarousel;