"use client"
import React from 'react';
import Navbar from './_components/shared/client/Navbar';
import Footer from './_components/shared/server/Footer';
import store from '@/lib/redux/store/store';
import { Provider } from 'react-redux';
import AuthProvider from '@/utils/AuthProvider';

function Layout1({ children }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <header className='sticky top-0 z-20 w-full shadow-md dark:shadow-none bg-[#ffffff] dark:bg-[#171717]'>
          <Navbar />
        </header>
        <main className='relative w-full 2xl:w-[80%] 5xl:w-2/3 mx-auto' role='main' aria-labelledby='mainContentLabel'>
          {children}
        </main>
        <footer className='mt-24 py-8 dark:bg-black dark:text-white' role="contentinfo">
          <Footer />
        </footer>
      </AuthProvider>
    </Provider>
  )
}

export default Layout1;