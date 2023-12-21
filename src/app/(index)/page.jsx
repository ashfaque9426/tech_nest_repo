import React from 'react';
import CardSectionForPages from './_components/shared/client/CardSectionForPages';
import { productByCategory } from '@/services/productServices';

export const metadata = {
  title: 'TechNest/Home Page',
  description: 'If you want to buy a Laptop or Pre-build Destop computers or Customize the configuaration for your Desktop computer of your choice then you will get Processors form Intel or Amd and Rams from different vendors, Brands such as G-Skill, Corsair or Brand of your choice, Power supply, PC Case, Keyboards, Mouse, Headphones, Phones from Apple or Androids, Pendrives, Usb Chargers, Phone cover and much more.',
}

function Page() {
  return (
    <main className='w-full xl:w-2/3 mx-auto' role='main'>

      {/* Product by Category section */}
      <section className='bg-[#fbfbfb] dark:bg-[#171414]'>
        <h1 className='text-2xl font-bold text-center'>Available Products By Category</h1>
        <CardSectionForPages title='Desktop Processors' fetchData={productByCategory('desktop processor', 11)} classNameForHeading='text-xl text-center font-semibold mt-1 mb-8' />
      </section>

      {/* Product by Brand section */}
      <section className='py-96'></section>

      {/* Product by Model section */}
      <section className='py-96 bg-[#fbfbfb] dark:bg-transparent'></section>
    </main>
  )
}

export default Page;