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
  const { success, data=[], message=false } = await getAllBannerData();
  
  return (
    <>
      {/* Banner section */}
      <header className='mt-8 mb-16' role="banner" aria-labelledby="carouselLabel" aria-live="polite">
        <HomePageBannerSlider success={success} dataArr={data} message={message} />
      </header>

      <main role="main" aria-labelledby="subMainContentLabel">
        {/* add section one(for exclusive offers) */}
        <aside role="complementary">
          <ExclusiveOfferComponent className='mt-12' discountSlogan="You can get 10% off on Electronic Products. Click here and have a look at our Products around 10% off." discountValue={10} exact={false} />
        </aside>

        {/* Product by Category section */}
        <section className='pt-24 px-5 2xl:px-0' role="region" aria-labelledby="section1Label">
          <h1 id='section1Label' className='text-2xl font-bold text-left lg:text-center underline lg:no-underline mb-5'>Available Processors</h1>
          <CardSectionComponentForSections title='Desktop Processors' category='desktop processor' limit={10} classNameForHeading='text-2xl lg:text-xl font-semibold mt-1 mb-8' />
        </section>

        {/* Product by Brand section */}
        <section className='pt-12 px-5 2xl:px-0' role="region" aria-labelledby="section2Label">
          <h1 id='section2Label' className='text-2xl font-bold text-left lg:text-center underline lg:no-underline mb-5'>Intel Processors</h1>
          <CardSectionComponentForSections title="Products by Intel" brand='intel' limit1={10} classNameForHeading='text-2xl lg:text-xl font-semibold mt-1 mb-8' />
        </section>

        {/* Product by Model section */}
        <section className='pt-12 px-5 2xl:px-0' role="region" aria-labelledby="section3Label">
          <h1 id='section3Label' className='text-2xl font-bold text-left lg:text-center underline lg:no-underline mb-5'>Smart Phones</h1>
          <CardSectionComponentForSections title="Available Phones" category='smart phone' limit={10} classNameForHeading='text-2xl lg:text-xl font-semibold mt-1 mb-8' />
        </section>
      </main>

    </>
  )
}

export default Page;