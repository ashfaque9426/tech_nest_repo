"use client"
import React from 'react';
import Sidebar from './_components/shared/client/Sidebar';
import HeaderComponentForDashboardLayout from './_components/shared/client/HeaderComponentForDashboardLayout';
import { Provider } from 'react-redux';
import store from '@/lib/redux/store/store';

function Layout2({children}) {
  return (
    <Provider store={store}>
      <HeaderComponentForDashboardLayout />
      <main className="w-full 2xl:w-2/3 mx-auto flex flex-col lg:flex-row justify-center items-center gap-5" role="main" aria-labelledby="mainContentLabel">
        <Sidebar />
        {children}
      </main>
    </Provider>
  )
}

export default Layout2;