import React from 'react';
import SingleProductLayout from '../../_components/client/SingleProductLayout';

export const metadata = {
  title: 'TechNest | Single Product Details',
  description: 'This is the page where all the details can be viewed for a specific product.',
}

function Page({ params }) {
  // getting the id from catch route.
  const id = params.id;

  return (
    <>
      <header id='mainContentLabel'>
        <h1 className='text-2xl text-center mt-5 mb-12 font-bold' >Product Specifications</h1>
      </header>
      <SingleProductLayout id={id} />
    </>
  )
}

export default Page;