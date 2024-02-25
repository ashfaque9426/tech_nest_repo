"use client"
import React, { useState } from 'react';
import BtnComponentOne from '../../../server/BtnComponentOne';
import Link from 'next/link';
import DarkThemeCompoentBtn from '../../../client/DarkThemeComponentBtn';
import SearchBarComponentForNavbar from '../../../client/SearchBarComponentForNavbar';
import Image from 'next/image';
import { IoIosArrowUp } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome } from "react-icons/fa";

function Navbar() {
  const [navbarVisibility, setNavbarVisibility] = useState(false);
  const [navbarItemOpen, setNavbarItemOpen] = useState(false);
  const [navbarItemOneOpen, setNavbarItemOneOpen] = useState(false);
  const [navbarItemTwoOpen, setNavbarItemTwoOpen] = useState(false);
  const [nestedCompItemOneOpen, setNestedNavbarCompItemOneOpen] = useState(false);
  const [nestedCompItemTwoOpen, setNestedNavbarCompItemTwoOpen] = useState(false);

  const handleAllOpendNavigation = () => {
    setNavbarVisibility(false);
    setNavbarItemOpen(false);
    setNavbarItemOneOpen(false);
    setNavbarItemTwoOpen(false);
    setNestedNavbarCompItemOneOpen(false);
    setNestedNavbarCompItemTwoOpen(false);
  }
  
  return (
    <nav className='shadow-md dark:shadow-none bg-[#ffffff] dark:bg-[#171717] flex flex-col gap-5 md:gap-3 py-5 md:p-3' role="navigation" aria-label="Main Navigation">

      <section role='region' className='flex flex-col md:flex-row justify-between items-center gap-5 md:gap-2'>

        <div className='w-full md:w-auto flex-1 flex items-center px-3 gap-3 md:gap-4'>
          <span role="img" aria-label="Company Logo" className='text-xl text-center font-bold'>
            <Image className='object-contain w-full h-full' src='/Logos/techNestLogo.JPG' alt='Logo Image' width={60} height={60} />
          </span>
          <SearchBarComponentForNavbar />
          <span onClick={() => { setNavbarVisibility(!navbarVisibility); setNavbarItemOpen(false); setNavbarItemOneOpen(false); setNavbarItemTwoOpen(false); setNestedNavbarCompItemOneOpen(false); setNestedNavbarCompItemTwoOpen(false); }} className='md:hidden text-4xl'><GiHamburgerMenu /></span>
        </div>

        <div className={`${navbarVisibility ? 'flex' : 'hidden'} md:flex justify-center items-center gap-5 md:gap-0`}>
          <div className='flex items-center gap-5 md:gap-3'>
            <Link href="/login">
              <BtnComponentOne className='bg-[#3498db] dark:bg-[#2c3e50]'>Login</BtnComponentOne>
            </Link>
            <Link href="/registration">
              <BtnComponentOne className='bg-[#c7723a] dark:bg-[#905b37]'>Register</BtnComponentOne>
            </Link>
          </div>

          <div>
            <DarkThemeCompoentBtn />
          </div>
        </div>

      </section>

      <section className={`${navbarVisibility ? 'block md:block' : 'hidden md:block'}`} role='region' aria-label="Main Content">
        {/* laptop's navgigation */}
        <ul className='flex flex-col md:flex-row justify-around items-center gap-5 md:gap-0'>
          <li onClick={handleAllOpendNavigation}><Link className='flex gap-2 items-center hover:text-orange-400' href="/"><span>Home</span> <FaHome /></Link></li>
          <li className='relative flex flex-col md:flex-row items-center hover:text-orange-400 group'>
            <span className='flex items-center'>
              <span onClick={() => { setNavbarItemOpen(!navbarItemOpen); setNavbarItemOneOpen(false); setNavbarItemTwoOpen(false)}} className='font-semibold mr-2 cursor-pointer'>Laptops</span>
              <span className='group-hover:rotate-180'><IoIosArrowUp /></span>
            </span>

            {/* laptops nav items */}
            <ul className={`${navbarItemOpen ? 'block' : 'hidden'} lg:group-hover:block text-center md:text-start group-hover:text-black dark:group-hover:text-white w-full md:w-[150px] px-3 py-2 md:pt-5 md:pb-2 md:absolute top-6 bg-[#ffffff] shadow-md dark:bg-[#171717] dark:shadow-none rounded-br-lg rounded-bl-lg`}>
              <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/laptop/none'>All Laptops</Link></li>
              <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/laptop/msi'>MSI</Link></li>
              <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/laptop/asus'>ASUS</Link></li>
              <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/laptop/hp'>HP</Link></li>
              <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/laptop/gigabyte'>GIGABYTE</Link></li>
              <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/laptop/lenovo'>LENOVO</Link></li>
              <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/laptop/chuwi'>CHUWI</Link></li>
            </ul>
          </li>

          {/* component's navigations */}
          <li className='relative flex flex-col md:flex-row items-center hover:text-orange-400 group'>
            <span className='flex items-center'>
              <span onClick={() => { setNavbarItemOneOpen(!navbarItemOneOpen); setNavbarItemOpen(false); setNavbarItemTwoOpen(false); setNestedNavbarCompItemOneOpen(false); setNestedNavbarCompItemTwoOpen(false); }} className='font-semibold mr-2 cursor-pointer'>Components</span>
              <span className='group-hover:rotate-180'><IoIosArrowUp /></span>
            </span>

            {/* component's navitems */}
            <ul className={`${navbarItemOneOpen ? "block" : "hidden"} lg:group-hover:block text-center md:text-start group-hover:text-black dark:group-hover:text-white w-full md:w-[150px] py-2 md:pt-5 md:pb-2 md:absolute top-6 bg-[#ffffff] shadow-md dark:bg-[#171717] dark:shadow-none rounded-br-lg rounded-bl-lg`}>
              <li className='hover:underline flex flex-col md:flex-row justify-center items-center group/item'>
                <span className='w-full px-3 py-2 flex justify-center md:justify-start items-center'>
                  <Link className='hidden lg:block mr-2 hover:text-orange-400' href='/showAllProductsOfSameCategory/desktop%20processor/none'>Processors</Link>
                  <span onClick={() => { setNestedNavbarCompItemOneOpen(!nestedCompItemOneOpen); setNestedNavbarCompItemTwoOpen(false); }} className='block lg:hidden mr-2 hover:text-orange-400'>Processors</span>
                  <span className='group-hover/item:rotate-180 md:group-hover/item:rotate-90'><IoIosArrowUp /></span>
                </span>

                {/* component's nested nav items one */}
                <span className='md:relative'>
                  <ul className={`${nestedCompItemOneOpen ? 'block' : 'hidden'} lg:group-hover/item:block text-center md:text-start group-hover/item:text-black dark:group-hover/item:text-white w-full md:w-[150px] px-3 py-2 md:pt-5 md:pb-2 md:absolute md:left-0 md:-top-3 bg-[#ffffff] shadow-md dark:bg-[#171717] dark:shadow-none rounded-lg`}>
                    <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/desktop%20processor/none'>All Processors</Link></li>
                    <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/desktop%20processor/intel'>Intel</Link></li>
                    <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/desktop%20processor/amd'>AMD</Link></li>
                  </ul>
                </span>
              </li>

              {/* component's navitems */}
              <li className='hover:underline flex flex-col md:flex-row justify-center items-center group/item'>
                <span className='w-full px-3 py-2 flex justify-center md:justify-start items-center'>
                  <Link className='hidden md:block mr-2 hover:text-orange-400' href='/showAllProductsOfSameCategory/motherboard/none'>Motherboards</Link>
                  <span onClick={() => { setNestedNavbarCompItemTwoOpen(!nestedCompItemTwoOpen); setNestedNavbarCompItemOneOpen(false); }} className='block md:hidden mr-2 hover:text-orange-400' href='/showAllProductsOfSameCategory/motherboard/none'>Motherboards</span>
                  <span className='group-hover/item:rotate-180 md:group-hover/item:rotate-90'><IoIosArrowUp /></span>
                </span>

                {/* component's nested nav items two */}
                <span className='md:relative'>
                  <ul className={`${nestedCompItemTwoOpen ? 'block' : 'hidden'} lg:group-hover/item:block text-center md:text-start group-hover/item:text-black dark:group-hover/item:text-white w-full md:w-[150px] px-3 py-2 md:pt-5 md:pb-2 md:absolute md:left-0 md:-top-3 bg-[#ffffff] shadow-md dark:bg-[#171717] dark:shadow-none rounded-lg`}>
                    <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/motherboard/none'>All Motherboard</Link></li>
                    <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/motherboard/msi'>MSI</Link></li>
                    <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/motherboard/asus'>Asus</Link></li>
                    <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/motherboard/asrock'>ASRock</Link></li>
                    <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/motherboard/gigabyte'>GIGABYTE</Link></li>
                  </ul>
                </span>
              </li>
            </ul>
          </li>

          {/* phone's navigations */}
          <li className='relative flex flex-col md:flex-row items-center hover:text-orange-400 group'>
            <span className='flex items-center'>
              <span onClick={() => { setNavbarItemTwoOpen(!navbarItemTwoOpen); setNavbarItemOpen(false); setNavbarItemOneOpen(false); setNestedNavbarCompItemOneOpen(false); setNestedNavbarCompItemTwoOpen(false); }} className='font-semibold mr-2 cursor-pointer'>Phones</span>
              <span className='group-hover:rotate-180'><IoIosArrowUp /></span>
            </span>

            {/* phone's navitems */}
            <ul className={`${navbarItemTwoOpen ? "block" : "hidden"} lg:group-hover:block text-center md:text-start group-hover:text-black dark:group-hover:text-white w-full md:w-[150px] px-3 py-2 md:pt-5 md:pb-2 md:absolute top-6 bg-[#ffffff] shadow-md dark:bg-[#171717] dark:shadow-none rounded-br-lg rounded-bl-lg`}>
              <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/smart%20phone/none'>All Phones</Link></li>
              <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/smart%20phone/xiaomi'>Xiaomi</Link></li>
              <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/smart%20phone/samsung'>Samsung</Link></li>
              <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/smart%20phone/apple'>Apple</Link></li>
              <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/smart%20phone/vivo'>Vivo</Link></li>
              <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/lapsmart%20phonetop/google'>Google</Link></li>
              <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/smart%20phone/oneplus'>OnePlus</Link></li>
              <li onClick={handleAllOpendNavigation} className='my-2 hover:underline'><Link href='/showAllProductsOfSameCategory/smart%20phone/oppo'>Oppo</Link></li>
            </ul>
          </li>
        </ul>
      </section>

    </nav>
  )
}

export default Navbar;