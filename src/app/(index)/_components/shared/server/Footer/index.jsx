import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function Footer() {
    return (
        <div className='py-5 md:py-0 flex flex-col items-center gap-8'>
            <section className='flex flex-col md:flex-row justify-around gap-5'>
                <div>
                    <Image className='object-contain w-full h-full' src='/Logos/techNestLogo.JPG' alt='Company Logo' width={500} height={101} />
                </div>
                <div className='flex flex-col gap-1'>
                    <h4 className='text-xl font-bold'>Contact Information:</h4>
                    <ul className='text-lg'>
                        <li className='mb-[2px]'>
                            <span className='font-bold'>Email:</span> <span><Link className='hover:text-red-500' href='mailto:ashfaqsylvi9426@gmail.com'>ashfaqsylvi9426@gmail.com</Link></span>
                        </li>
                        <li>
                            <span className='font-bold'>Phone:</span> <span><Link className='hover:text-red-500' href='tel:+8801970703586'>+8801970703586</Link></span>
                        </li>
                    </ul>
                    <section>
                        <h5 className='text-lg font-bold mb-[5px]'>Follow Us On</h5>
                        <div className='text-3xl flex items-center gap-3'>
                            <Link href='#'><FaFacebook /></Link>
                            <Link href='#'><FaInstagramSquare /></Link>
                            <Link href='#'><FaTwitter /></Link>
                        </div>
                    </section>
                </div>
            </section>
            <section className='flex justify-center items-center'>
                <h5 className='text-lg text-center font-bold'>All rights reserved @Ashfaq&apos;s personal <Link href='http://localhost:3000/'><span className='hover:underline text-red-500'>E-commerce Project</span></Link></h5>
            </section>
        </div>
    )
}

export default Footer;