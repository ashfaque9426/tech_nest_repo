"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ThemeSwitchBTN from '../../server/ThemeSwitchBTN';

function Navbar() {
  // state for setting the theme
  const [theme, setTheme] = useState(null);
  // states for navbar items and subitems.
  const [navItems, setNavItems] = useState(["Home", "Today&apos;s Deal", "Components", "Desktop", "Laptop", "Monitor", "Ups", "Tablet", "Phones", "Camera", "Office Equipment", "Gadget", "Gaming", "TV", "Accessories" ]);
  const [subComponents, setSubComponents] = useState(["Processor", "CPU Cooler", "Ram (Desktop)", "Ram (Laptop)", "Graphics Cards", "Hard Disk", "Protable Hard Drives", "SSD", "PSU", "Casing", "Casing Cooler"]);
  const [subAccessories, setSubAccessories] = useState(["Keyboard", "Mouse", "Headphone", "Bluetooth Headphone", "Mouse Pad", "Speakers and Home Theater", "Bluetooth Speaker", "Wrist Rest", "Card Reader", "Converter & Cable", "Hubs & Docs", "Microphone", "Sound Card", "Capture Card", "Pen Drive", "Memory Card"]);
  const [subGadgets, setSubGadgets] = useState(["TV Box", "Drone", "Smart Watch", "Smart Band", "Earphone", "Earbuds", "Power Bank", "Drones", "Gimbat", "Steam Deck"]);
  const [subGamingItems, setSubGamingItems] = useState(["Gaming Chair", "Gaming Sofa", "Gaming Headset", "Gaming Mouse", "Gaming Keyboard", "Gaming Headset", "Gaming Console", "Gaming Desk", "Games"]);

  // system based theme applied on window load
  useEffect(() => {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  // add class to document body based on the theme.
  useEffect(() => {
    if(theme === 'dark') {
      document.body.classList.remove('light');
      document.body.classList.add('dark', 'bg-[#121212]', 'text-white');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark', 'bg-[#121212]', 'text-white');
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // for handling theme switch
  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <nav className='mb-5 flex justify-center items-center border dark:border-none py-3'>
      <h1 className='text-xl text-center font-bold'>Tech Nest Navbar</h1>
      <section></section>
      <section></section>
      <section>
        <ThemeSwitchBTN theme={theme} handleThemeSwitch={handleThemeSwitch}/>
      </section>
    </nav>
  )
}

export default Navbar;