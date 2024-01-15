import React from 'react';
import Navbar from './_components/shared/client/Navbar';
import Footer from './_components/shared/server/Footer';

function Layout1({ children }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className='relative w-full 2xl:w-2/3 mx-auto dark:bg-[#121212]' role='main' aria-labelledby='mainContentLabel'>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout1;