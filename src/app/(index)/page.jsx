import React from 'react';
import { getProductsByBrandName, getProductsByModelName, productByCategory } from '@/services/productServices';
import CardSectionComponentForSections from './_components/shared/client/CardSectionComponentForSections';


export const metadata = {
  title: 'TechNest/Home Page',
  description: 'If you want to buy a Laptop or Pre-build Destop computers or Customize the configuaration for your Desktop computer of your choice then you will get Processors form Intel or Amd and Rams from different vendors, Brands such as G-Skill, Corsair or Brand of your choice, Power supply, PC Case, Keyboards, Mouse, Headphones, Phones from Apple or Androids, Pendrives, Usb Chargers, Phone cover and much more.',
}

function Page() {
  return (
    <main className='relative w-full xl:w-2/3 mx-auto' role='main'>

      {/* Banner section */}
      <section>

      </section>

      {/* add section one(for exclusive 33% off offers) */}
      <aside>
        
      </aside>

      {/* Product by Category section */}
      <section className='bg-[#fbfbfb] dark:bg-[#171414] py-8'>
        <h1 className='text-2xl font-bold text-center px-5 mb-5'>Available Products By Category</h1>
        <CardSectionComponentForSections title='Desktop Processors' fetchData={productByCategory('desktop processor', 11)} classNameForHeading='text-xl font-semibold mt-1 mb-8' />
      </section>

      {/* Product by Brand section */}
      <section className='py-8'>
        <h1 className='text-2xl font-bold text-center px-5 mb-5'>Products by Brand Name</h1>
        <CardSectionComponentForSections title="Products by Intel" fetchData={getProductsByBrandName('intel', 11)} classNameForHeading='text-xl font-semibold mt-1 mb-8' />
      </section>

      {/* Product by Model section */}
      <section className='bg-[#fbfbfb] dark:bg-[#171414] py-8'>
        <h1 className='text-2xl font-bold text-center px-5 mb-5'>Products by Model</h1>
        <CardSectionComponentForSections title="Intel i5 Series" fetchData={getProductsByModelName('i5', 11)} classNameForHeading='text-xl font-semibold mt-1 mb-8' />
        <CardSectionComponentForSections title="Intel i3 Series" fetchData={getProductsByModelName('i3', 11)} classNameForHeading='text-xl font-semibold mt-1 mb-8' />
        <CardSectionComponentForSections title="Intel Pentium Series" fetchData={getProductsByModelName('Pentium', 11)} classNameForHeading='text-xl font-semibold mt-1 mb-8' />
      </section>

      {/* add section two(for usual 20% off offers) */}
      <aside>

      </aside>

      {/* add section three(for usual 10% off offers) */}
      <aside>

      </aside>
    </main>
  )
}

export default Page;