import React from 'react';
import SingleProductLayout from '../../_components/client/SingleProductLayout';

function Page({ params }) {
  // getting the id from catch route.
  const id = params.id;

  return (
    <>
      <h1 className='text-2xl text-center mt-5 mb-12 font-bold' >Single Product Details</h1>
      <SingleProductLayout id={id} />
    </>
  )
}

export default Page;