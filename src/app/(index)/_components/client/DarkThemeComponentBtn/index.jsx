"use client"
import React, { useEffect, useState } from 'react';
import ThemeSwitchBTN from '../../shared/server/ThemeSwitchBTN';


function DarkThemeCompoentBtn() {
  // state for setting the theme
  const [theme, setTheme] = useState(null);

  // system based theme applied on window load
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  // add class to document body based on the theme.
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.remove('light');
      document.body.classList.add('dark', 'bg-[#202124]', 'text-white');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark', 'bg-[#202124]', 'text-white');
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

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