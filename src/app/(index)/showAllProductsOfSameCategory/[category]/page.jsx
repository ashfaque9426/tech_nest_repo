import React from 'react';
import AllProductsByCategoryLayout from '../../_components/client/AllProdutsByCategoryLayout';

export const metadata = {
  title: 'TechNest | All Products',
  description: 'This page will display all products by same category.',
}

function Page({ params }) {
  const category = params.category;
  return (
    <>
      <header>
        <h1 id='mainContentLabelHeading' className='text-2xl text-center mt-5 mb-12 font-bold'>Products by same category: {category}</h1>
      </header>
      <main className='flex flex-col md:flex-row gap-5' role='main' aria-labelledby='subMainContentLabel'>
        <AllProductsByCategoryLayout category={category} />
      </main>
    </>
  )
}

export default Page;