"use client"
import React, { useEffect, useState } from 'react';
import ThemeSwitchBTN from '../../shared/server/ThemeSwitchBTN';
import { usePathname } from 'next/navigation';


function DarkThemeCompoentBtn() {
  // state for setting the theme
  const [theme, setTheme] = useState(null);
  const pathname = usePathname();

  // system based theme applied on window onload event
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  // add class to document body based on the theme state or button click event.
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.remove('light');
      document.body.classList.add('dark','text-white');

      if (pathname === '/login') {
        document.body.classList.remove('bg-[#202124]');
        document.body.classList.add('bg-[#f3f4f6]');
      } else {
        document.body.classList.remove('bg-[#f3f4f6]');
        document.body.classList.add('bg-[#202124]');
      }
      
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark', 'bg-[#202124]', 'text-white');
      document.body.classList.add('light');

      if (pathname !== '/login' && document.body.classList.contains('bg-[#f3f4f6]')) document.body.classList.remove('bg-[#f3f4f6]');
      
      if (pathname === '/login') document.body.classList.add('bg-[#f3f4f6]');

      localStorage.setItem('theme', 'light');
    }
  }, [theme, pathname]);

  // for handling theme switch
  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }
  return (
    <>
      <ThemeSwitchBTN theme={theme} handleThemeSwitch={handleThemeSwitch} />
    </>
  )
}

export default DarkThemeCompoentBtn;