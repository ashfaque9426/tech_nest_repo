import React from 'react';
import Image from 'next/image';

function Footer() {
    return (
        <footer className='mt-24 flex flex-col items-center gap-5 bg-black text-white p-5' role="contentinfo">
            <section className='flex justify-around gap-5'>
                <div>
                    <Image className='object-contain w-full h-full' src='/Logos/techNestLogo.JPG' alt='Company Logo' width={101} height={101} />
                </div>
                <div>
                    <h4 className='text-lg font-bold'>Contact Information:</h4>
                    <ul>
                        <li>
                            <span className='font-bold'>Email:</span> <span>ashfaqsylvi9426@gmail.com</span>
                        </li>
                        <li>
                            <span className='font-bold'>Phone:</span> <span>+8801970703586</span>
                        </li>
                    </ul>
                </div>
            </section>
            <section className='flex justify-center items-center'>
                <h5 className='text-lg  font-bold'>All rights reserved @Ashfaq&apos;s personal <span className='text-red-500'>E-commerce Project</span></h5>
            </section>
        </footer>
    )
}

export default Footer;