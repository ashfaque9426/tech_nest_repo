import React from 'react';

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
      <main role='main' aria-labelledby='subMainContentLabel'>

      </main>
    </>
  )
}

export default Page;