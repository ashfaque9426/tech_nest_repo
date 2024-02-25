import React from 'react';
import CardSectionComponentForSections from './_components/shared/server/CardSectionComponentForSections';
import ExclusiveOfferComponent from './_components/shared/client/AdvertisingComponents/ExclusiveOfferComponent';
import HomePageBannerSlider from './_components/server/HomePageBannerSlider';
import { getAllBannerData } from '@/services/bannerServices';
import ShowMoreBtn from './_components/shared/server/ShowMoreBtn';


export const metadata = {
  title: 'TechNest/Home Page',
  description: 'If you want to buy a Laptop or Pre-build Destop computers or Customize the configuaration for your Desktop computer of your choice then you will get Processors form Intel or Amd and Rams from different vendors, Brands such as G-Skill, Corsair or Brand of your choice, Power supply, PC Case, Keyboards, Mouse, Headphones, Phones from Apple or Androids, Pendrives, Usb Chargers, Phone cover and much more.',
}

async function Page() {
  const { success, data=[], message=false } = await getAllBannerData();
  
  return (
    <div className="5xl:w-[95%] mx-auto">
      {/* Banner section */}
      <header className='mt-12 mb-16' role="banner" aria-labelledby="carouselLabel" aria-live="polite">
        <HomePageBannerSlider success={success} dataArr={data} message={message} />
      </header>

      {/* add section one(for exclusive offers) */}
      <aside role="complementary">
        <ExclusiveOfferComponent className='mt-12' discountSlogan="You can get 10% off on Electronic Products. Click here and have a look at our Products around 10% off." discountValue={10} exact={false} />
      </aside>

      <main className='px-16 lg:px-5 2xl:px-0' role="main" aria-labelledby="subMainContentLabel">
        
        {/* Desktop Processors by Category section */}
        <section className='mt-24' role="region" aria-labelledby="section1Label">
          <h1 id='section1LabelHeading' className='text-xl text-center md:text-start md:text-2xl font-bold lg:text-center underline lg:no-underline mb-5 '>Available Processors</h1>
          <CardSectionComponentForSections title='Desktop Processors' category='desktop processor' limit={10} classNameForHeading='text-lg text-center md:text-start lg:text-xl font-semibold mt-1 mb-8' />
          <ShowMoreBtn className='text-red-500 font-semibold dark:text-white w-full' url="/showAllProductsOfSameCategory/desktop%20processor/none">Show More</ShowMoreBtn>
        </section>

        {/* Motherboards by Category section */}
        <section className='mt-24' role="region" aria-labelledby="section2Label">
          <h1 id='section2LabelHeading' className='text-xl text-center md:text-start md:text-2xl font-bold lg:text-center underline lg:no-underline mb-5'>Available Motherboards</h1>
          <CardSectionComponentForSections title="Motherboards" category='motherboard' limit={10} classNameForHeading='text-lg text-center md:text-start lg:text-xl font-semibold mt-1 mb-8' />
          <ShowMoreBtn className='text-red-500 font-semibold dark:text-white w-full' url="/showAllProductsOfSameCategory/motherboard/none">Show More</ShowMoreBtn>
        </section>

        {/* Laptop by Category section */}
        <section className='mt-24' role="region" aria-labelledby="section3Label">
          <h1 id='section3LabelHeading' className='text-xl text-center md:text-start md:text-2xl font-bold lg:text-center underline lg:no-underline mb-5'>Available Laptops</h1>
          <CardSectionComponentForSections title='Laptops' category='laptop' limit={10} classNameForHeading='text-lg text-center md:text-start lg:text-xl font-semibold mt-1 mb-8' />
          <ShowMoreBtn className='text-red-500 font-semibold dark:text-white w-full' url="/showAllProductsOfSameCategory/laptop/none">Show More</ShowMoreBtn>
        </section>

        {/* Smart Phone by Category section */}
        <section className='mt-24' role="region" aria-labelledby="section4Label">
          <h1 id='section4LabelHeading' className='text-xl text-center md:text-start md:text-2xl font-bold lg:text-center underline lg:no-underline mb-5'>Smart Phones</h1>
          <CardSectionComponentForSections title="Available Phones" category='smart phone' limit={10} classNameForHeading='text-lg text-center md:text-start lg:text-xl font-semibold mt-1 mb-8' />
          <ShowMoreBtn className='text-red-500 font-semibold dark:text-white w-full' url="/showAllProductsOfSameCategory/smart%20phone/none">Show More</ShowMoreBtn>
        </section>

      </main>

    </div>
  )
}

export default Page;