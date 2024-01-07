import React from 'react';
import Sidebar from './_components/shared/client/Sidebar';

function Layout2({children}) {
  return (
    <main style={{ maxWidth: '1920px', marginInline: 'auto' }} className="flex flex-col lg:flex-row justify-center items-center gap-5 w-full md:w-[80%] lg:w-[75%] mx-auto" role="main" aria-labelledby="mainContentLabel">
        <Sidebar />
        {children}
    </main>
  )
}

export default Layout2;