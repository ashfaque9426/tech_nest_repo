import React from 'react';
import Navbar from './_components/shared/client/Navbar';
import Footer from './_components/shared/server/Footer';

function Layout1({children}) {
  return (
    <>
        <Navbar />
        {children}
        <Footer />
    </>
  )
}

export default Layout1;