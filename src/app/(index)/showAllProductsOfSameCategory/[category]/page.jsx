import React from 'react';
import AllProductsByCategoryLayout from '../../_components/client/AllProdutsByCategoryLayout';

export const metadata = {
  title: 'TechNest | All Products',
  description: 'This page will display all products by same category.',
}

function Page({ params }) {
  const category = params.category;
  // console.log(category);
  return (
    <>
      <header>
        <h1 id='mainContentLabelHeading' className='text-2xl text-center mt-5 mb-12 font-bold capitalize'>Products by same category: {category.split('%20').length > 0 ? category.split('%20')[0] + " " + category.split('%20')[1] : category}</h1>
      </header>
      <main className='flex flex-col px-5 2xl:px-0 md:flex-row gap-5' role='main' aria-labelledby='subMainContentLabel'>
        <AllProductsByCategoryLayout category={category} />
      </main>
    </>
  )
}

export default Page;