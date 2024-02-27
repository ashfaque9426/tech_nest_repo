import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
    return (
        <div className='py-5 md:py-0 flex flex-col items-center gap-8'>
            <section className='flex flex-col md:flex-row justify-around gap-5'>
                <div>
                    <Image className='object-contain w-full h-full' src='/Logos/techNestLogo.JPG' alt='Company Logo' width={500} height={101} />
                </div>
                <div>
                    <h4 className='text-lg font-bold'>Contact Information:</h4>
                    <ul>
                        <li>
                            <span className='font-bold'>Email:</span> <span><Link className='hover:text-red-500' href='mailto:ashfaqsylvi9426@gmail.com'>ashfaqsylvi9426@gmail.com</Link></span>
                        </li>
                        <li>
                            <span className='font-bold'>Phone:</span> <span><Link className='hover:text-red-500' href='tel:+8801970703586'>+8801970703586</Link></span>
                        </li>
                    </ul>
                </div>
            </section>
            <section className='flex justify-center items-center'>
                <h5 className='text-lg text-center font-bold'>All rights reserved @Ashfaq&apos;s personal <span className='text-red-500'>E-commerce Project</span></h5>
            </section>
        </div>
    )
}

export default Footer;