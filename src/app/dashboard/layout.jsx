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
      <main className="w-full 2xl:w-2/3 mx-auto flex flex-col lg:flex-row justify-center items-center gap-5" role="main" aria-labelledby="mainContentLabel">
        <Sidebar />
        {children}
      </main>
    </>
  )
}

export default Layout2;