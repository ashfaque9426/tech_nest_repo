import React from 'react';
import Navbar from './_components/shared/client/Navbar';
import Footer from './_components/shared/server/Footer';

function Layout1({ children }) {
  return (
    <>
      <header className='sticky top-0 z-20 w-full 5xl:w-[75%] mx-auto'>
        <Navbar />
      </header>
      <main className='relative w-full 2xl:w-[80%] 5xl:w-2/3 mx-auto' role='main' aria-labelledby='mainContentLabel'>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout1;