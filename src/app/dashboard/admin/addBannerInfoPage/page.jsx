'use client'
import React from 'react'
import DashboardCustomFormInput from '../../_components/shared/server/DashboardCustomFormInput';

function Page() {
    const handleSubmit = e => {
        const form = e.target;
        const bannerTitle = form.bannerTitle;
        const bannerSubtitle = form.bannerSubtitle;
        const bgImgUrl = form.bgImgUrl;
        const productImgUrl = form.productImgUrl || "";


    }
  return (
      <main className='lg:w-[85%] h-[calc(100vh-10vh)] flex justify-center items-center 2xl:w-2/3' role='main'>
          <form className='m-5' onSubmit={handleSubmit}>
              <fieldset className='border rounded-lg p-5 pb-12'>
                  <legend className='my-3 text-lg font-semibold'>Banner Information From</legend>
                  <div className='flex flex-col gap-5 p-5'>
                      <section className='flex flex-col gap-1'>
                          <label htmlFor='bannerTitle'>Banner Title*</label>
                          <DashboardCustomFormInput type='text' name='bannerTitle' id='bannerTitle' className="" placeholder='Banner Title' required />
                      </section>

                      <section className='flex flex-col gap-1'>
                          <label htmlFor='bannerSubtitle'>Banner Subtitle*</label>
                          <DashboardCustomFormInput type='text' name='bannerSubtitle' id='bannerSubtitle' className="" placeholder='Banner Sub Title' required />
                      </section>

                      <section className='flex flex-col gap-1'>
                          <label htmlFor='bgImgUrl'>Background Image Url*</label>
                          <DashboardCustomFormInput type='text' name='bgImgUrl' id='bgImgUrl' className="" placeholder='Background Image Url' required />
                      </section>

                      <section className='flex flex-col gap-1'>
                          <label htmlFor='productImgUrl'>Product Image</label>
                          <DashboardCustomFormInput type='text' name='productImgUrl' id='productImgUrl' className="" placeholder='Product Image Url' />
                      </section>
                  </div>

                  {/* submit button input field of type submit */}
                  <input className='w-full bg-black mt-5 text-white px-3 rounded-md py-2 hover:cursor-pointer' type="submit" value="Submit" />
            </fieldset>
        </form>
    </main>
  )
}

export default Page;