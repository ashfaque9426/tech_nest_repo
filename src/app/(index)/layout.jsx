import React from 'react';
import Navbar from './components/client/shared/Navbar/Navbar';
import Footer from './components/server/shared/Footer/Footer';

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