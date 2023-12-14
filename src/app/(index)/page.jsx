import React from 'react';
import CardSectionForPages from './_components/shared/client/CardSectionForPages';
import { productByCategory } from '@/services/productServices';

export const metadata = {
  title: 'TechNest/Home Page',
  description: 'If you want to buy a Laptop or Pre-build Destop computers or Customize the configuaration for your Desktop computer of your choice then you will get Processors form Intel or Amd and Rams from different vendors, Brands such as G-Skill, Corsair or Brand of your choice, Power supply, PC Case, Keyboards, Mouse, Headphones, Phones from Apple or Androids, Pendrives, Usb Chargers, Phone cover and much more.',
}

function Page() {

  return (
    <main className='w-full lg:w-2/3 mx-auto' role='main'>
      <h1 className='text-xl font-bold text-center'>Available Products</h1>
      <CardSectionForPages title='Available products by category' fetchData={productByCategory('desktop processor')} />
    </main>
  )
}

export default Page;