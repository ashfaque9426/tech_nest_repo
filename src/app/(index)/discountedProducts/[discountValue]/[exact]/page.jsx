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
        <>
            <header className='mx-5 xl:mx-auto'>
                <h1 id='mainContentLabel' className='text-2xl font-bold my-8 text-yellow-600'>Discount on Products around {discountValue}% Off...</h1>
            </header>
            <DiscountedProductsComponent discountValue={discountValue} exact={exact} />
        </>
    )
}

export default Page;