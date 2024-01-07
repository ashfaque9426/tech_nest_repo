"use client"
import React from 'react';
import { usePathname } from 'next/navigation'

function HeaderComponentForDashboardLayout() {
    const pathname = usePathname();
    return (
        <header className='py-3 border my-5'>
            <h1 className='text-lg font-bold ms-5'>Current-Pathname: <span className='text-red-500'>{pathname}</span></h1>
        </header>
    )
}

export default HeaderComponentForDashboardLayout