import React from 'react';
import AllProductsByCategoryLayout from '../../_components/client/AllProdutsByCategoryLayout';

export const metadata = {
  title: 'TechNest | All Products',
  description: 'This page will display all products by same category.',
}

function Page({ params }) {
  let category;
  let brand;
  if (params.category.split("%2B")) {
    category = params.category.split("%2B")[0];
    brand = params.category.split("%2B")[1];
  } else {
    category = params.category;
  }
  // console.log(category, brand);
  return (
    <>
      <header>
        <h1 id='mainContentLabelHeading' className='text-2xl text-center mt-5 mb-12 font-bold capitalize'>Products by same category: {category.includes('%20') && category.replace('%20', " ")}</h1>
      </header>
      <main className='flex flex-col px-5 2xl:px-0 md:flex-row gap-5' role='main' aria-labelledby='subMainContentLabel'>
        <AllProductsByCategoryLayout category={category} brand={brand} />
      </main>
    </>
  )
}

export default Page;