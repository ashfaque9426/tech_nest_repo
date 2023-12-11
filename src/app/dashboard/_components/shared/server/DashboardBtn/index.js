import clsx from 'clsx';
import React from 'react'

function DashboardBtn({children, onClick, className, id}) {
  return (
      <button className={clsx('bg-black text-white px-3 rounded-md py-1', className)} id={id} onClick={onClick}>{children}</button>
  )
}

export default DashboardBtn;