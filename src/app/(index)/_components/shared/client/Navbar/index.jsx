import React from 'react';
import BtnComponentOne from '../../../server/BtnComponentOne';
import Link from 'next/link';
import DarkThemeCompoentBtn from '../../../client/DarkThemeComponentBtn';
import SearchBarComponentForNavbar from '../../../client/SearchBarComponentForNavbar';
import Image from 'next/image';

function Navbar() {
  return (
    <nav className='shadow-md dark:shadow-none dark:bg-[#333333] dark:bg-opacity-50 flex flex-col gap-3 p-3' role="navigation" aria-label="Main Navigation">

      <section role='region' className='flex flex-col md:flex-row justify-between items-center gap-5'>

        <div className='flex-1 flex items-center gap-3'>
          <span role="img" aria-label="Company Logo" className='text-xl text-center font-bold'>
            <Image className='object-contain w-full h-full' src='/Logos/techNestLogo.JPG' alt='Logo Image' width={60} height={60} />
          </span>
          <SearchBarComponentForNavbar />
        </div>

        <div className='flex items-center'>
          <div className='flex items-center gap-3'>
            <Link href="#">
              <BtnComponentOne className='bg-[#3498db] dark:bg-[#2c3e50]'>Login</BtnComponentOne>
            </Link>
            <Link href="#">
              <BtnComponentOne className='bg-[#c7723a] dark:bg-[#905b37]'>Register</BtnComponentOne>
            </Link>
          </div>

          <div>
            <DarkThemeCompoentBtn />
          </div>
        </div>

      </section>

      <section role='region' aria-label="Main Content">
        <ul className='flex flex-col md:flex-row justify-around items-center'>
          <li>
            <Link className='font-semibold hover:text-orange-400' href='/showAllProductsOfSameCategory/laptop/none'>Laptops</Link>
          </li>
          <li>
            <Link className='font-semibold hover:text-orange-400' href='#'>Components</Link>
          </li>
          <li>
            <Link className='font-semibold hover:text-orange-400' href='/showAllProductsOfSameCategory/smart%20phone/none'>Phones</Link>
          </li>
        </ul>
      </section>

    </nav>
  )
}

export default Navbar;