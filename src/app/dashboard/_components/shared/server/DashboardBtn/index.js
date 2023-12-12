import clsx from 'clsx';
import React from 'react'

function DashboardBtn({children, onClick, className, id, ...restProps}) {
  return (
    <button className={clsx('bg-black text-white px-3 rounded-md py-1', className)} id={id} onClick={onClick} {...restProps} >{children}</button>
  )
}

export default DashboardBtn;