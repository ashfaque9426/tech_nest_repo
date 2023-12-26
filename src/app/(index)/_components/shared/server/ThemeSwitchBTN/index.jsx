import cn from '@/lib/clsx/cn';
import Image from 'next/image';
import React from 'react'

function ThemeSwitchBTN({ className, theme, handleThemeSwitch }) {
  return (
      <button className={cn('mx-3', className)} onClick={handleThemeSwitch}>
          {
              theme === 'dark' ? <Image src='/svgs/sun-light-theme-svgrepo-com.svg' alt='svg sun image to switch dark theme' width={30} height={30} /> : <Image src='/svgs/dark-mode-6682.svg' alt='svg moon image to swich light theme' width={25} height={25} />
          }
      </button>
  )
}

export default ThemeSwitchBTN;