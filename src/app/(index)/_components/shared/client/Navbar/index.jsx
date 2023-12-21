"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function Navbar() {
  const [theme, setTheme] = useState(null);

  // system based theme applied on window load
  useEffect(() => {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }else {
      setTheme('light');
    }
  }, []);

  // add class to document body based on the theme.
  useEffect(() => {
    if(theme === 'dark') {
      document.body.classList.remove('light');
      document.body.classList.add('dark', 'bg-[#121212]', 'text-white');
    } else {
      document.body.classList.remove('dark', 'bg-[#121212]', 'text-white');
      document.body.classList.add('light');
    }
  }, [theme]);

  // for handling theme switch
  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <nav className='mb-5 flex justify-center items-center border dark:border-none py-3'>
      <h1 className='text-xl text-center font-bold'>Tech Nest Navbar</h1>
      <button className='mx-3' onClick={handleThemeSwitch}>
        {
          theme === 'dark' ? <Image src='/svgs/sun-light-theme-svgrepo-com.svg' alt='svg sun image to switch dark theme' width={30} height={30} /> : <Image src='/svgs/dark-mode-6682.svg' alt='svg moon image to swich light theme' width={25} height={25} />
        }
      </button>
    </nav>
  )
}

export default Navbar;