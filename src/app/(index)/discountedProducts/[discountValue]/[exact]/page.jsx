import React from 'react';
import DiscountedProductsComponent from '../../../_components/client/DiscountedProductsComponent';

export const metadata = {
    title: 'TechNest | Discounted Product Details',
    description: 'This page contains informations about discounted products.',
}

function Page({ params }) {
    const discountValue = params.discountValue;
    const exact = params.exact;
    return (
        <main style={{ maxWidth: '1920px', marginInline: 'auto' }} className='px-5 xl:px-0 w-full xl:w-2/3 mx-auto' role='main'>
            <header>
                <h1 className='text-2xl font-bold my-8 text-yellow-600'>Discount on Products around {discountValue}% Off...</h1>
            </header>
            <DiscountedProductsComponent discountValue={discountValue} exact={exact} />
        </main>
    )
}

export default Page;