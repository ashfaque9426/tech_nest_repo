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
        <main className='px-5 xl:px-0 w-full xl:w-2/3 mx-auto' role='main'>
            <h1 className='text-2xl font-bold my-8'>Discount on Products around {discountValue}% Off...</h1>
            <DiscountedProductsComponent discountValue={discountValue} exact={exact} />
        </main>
    )
}

export default Page;