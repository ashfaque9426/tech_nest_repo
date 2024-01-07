import React from 'react';
import Sidebar from './_components/shared/client/Sidebar';
import HeaderComponentForDashboardLayout from './_components/shared/client/HeaderComponentForDashboardLayout';

export const metadata = {
  title: 'TechNest/Dashboard Home',
  description: 'This is Dashboard home page for authorized users.'
}

function Layout2({children}) {
  return (
    <>
      <HeaderComponentForDashboardLayout />
      <main style={{ maxWidth: '1920px', marginInline: 'auto' }} className="flex flex-col lg:flex-row justify-center items-center gap-5 w-full" role="main" aria-labelledby="mainContentLabel">
        <Sidebar />
        {children}
      </main>
    </>
  )
}

export default Layout2;