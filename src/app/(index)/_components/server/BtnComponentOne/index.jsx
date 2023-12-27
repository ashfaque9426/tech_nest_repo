import cn from '@/lib/clsx/cn';
import React from 'react'

function BtnComponentOne({children, className, iconFirst, iconLast, iconClass, onClickFunc}) {
  return (
      <button className={cn('text-lg text-white font-semibold bg-[#585657] px-5 py-1 rounded-3xl cursor-pointer flex items-center', className)} onClick={onClickFunc} >{iconFirst && <span className={cn('mx-2', iconClass)}>{iconFirst}</span>} {children} {iconLast && <span className={cn('mx-2', iconClass)}>{iconLast}</span>}</button>
  )
}

export default BtnComponentOne;