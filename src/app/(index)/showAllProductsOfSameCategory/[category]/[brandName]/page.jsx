import React from 'react';
import AllProductsByCategoryLayout from '@/app/(index)/_components/client/AllProdutsByCategoryLayout';


export const metadata = {
  title: 'TechNest | All Products',
  description: 'This page will display all products by same category.',
}

function Page({ params }) {
  const category = params.category;
  const brandName = params.brandName;
  
  return (
    <>
      <header>
        <h1 id='mainContentLabelHeading' className='text-2xl text-center mt-5 mb-12 font-bold capitalize'>{brandName ? <><span>{brandName}</span> --&gt; {category.includes('%20') && category.replace('%20', " ") || category} </> : <><span>Products by same category:</span> {category.includes('%20') && category.replace('%20', " ") || category}</>}</h1>
      </header>
      <main className='flex flex-col px-5 2xl:px-0 md:flex-row gap-5' role='main' aria-labelledby='subMainContentLabel'>
        <AllProductsByCategoryLayout category={category} brand={brandName} />
      </main>
    </>
  )
}

export default Page;