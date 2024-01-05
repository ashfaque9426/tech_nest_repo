import React from 'react';
import CardSectionComponentForSections from './_components/shared/server/CardSectionComponentForSections';
import ExclusiveOfferComponent from './_components/shared/client/AdvertisingComponents/ExclusiveOfferComponent';
import HomePageBannerSlider from './_components/server/HomePageBannerSlider';
import { getAllBannerData } from '@/services/bannerServices';

export const metadata = {
  title: 'TechNest/Home Page',
  description: 'If you want to buy a Laptop or Pre-build Destop computers or Customize the configuaration for your Desktop computer of your choice then you will get Processors form Intel or Amd and Rams from different vendors, Brands such as G-Skill, Corsair or Brand of your choice, Power supply, PC Case, Keyboards, Mouse, Headphones, Phones from Apple or Androids, Pendrives, Usb Chargers, Phone cover and much more.',
}

async function Page() {
  const { bannerData } = await getAllBannerData();
  
  return (
    <main className='relative w-full xl:w-2/3 mx-auto bg-[#fbfbfb] dark:bg-[#141414]' role='main'>

      {/* Banner section */}
      <section className='my-8'>
        <HomePageBannerSlider dataArr={bannerData.data} />
      </section>

      {/* add section one(for exclusive offers) */}
      <aside>
        <ExclusiveOfferComponent discountSlogan="You can get 10% off on Electronic Products. Click here and have a look at our Products around 10% off." discountValue={10} exact={false} />
      </aside>

      {/* Product by Category section */}
      <section className='py-8'>
        <h1 className='text-2xl font-bold text-left lg:text-center px-5 mb-5'>Available Products By Category</h1>
        <CardSectionComponentForSections title='Desktop Processors' category='desktop processor' limit={11} classNameForHeading='text-2xl lg:text-xl font-semibold mt-1 mb-8' />
      </section>

      {/* Product by Brand section */}
      <section className='py-8'>
        <h1 className='text-2xl font-bold text-left lg:text-center px-5 mb-5'>Products by Brand Name</h1>
        <CardSectionComponentForSections title="Products by Intel" brand='intel' limit1={11} classNameForHeading='text-2xl lg:text-xl  font-semibold mt-1 mb-8' />
      </section>

      {/* Product by Model section */}
      <section className='py-8'>
        <h1 className='text-2xl font-bold text-left lg:text-center px-5 mb-5'>Products by Model</h1>
        <CardSectionComponentForSections title="Intel i5 Series" model='i5' limit2={11} classNameForHeading='text-2xl lg:text-xl  font-semibold mt-1 mb-8' />
        <CardSectionComponentForSections title="Intel i3 Series" model='i3' limit2={11} classNameForHeading='text-2xl lg:text-xl  font-semibold mt-1 mb-8' />
        <CardSectionComponentForSections title="Intel Pentium Series" model='Pentium' limit2={11} classNameForHeading='text-2xl lg:text-xl  font-semibold mt-1 mb-8' />
      </section>

    </main>
  )
}

export default Page;