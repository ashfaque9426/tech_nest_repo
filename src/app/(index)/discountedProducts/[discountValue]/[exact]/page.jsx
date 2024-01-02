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
        <main role='main'>
            <h1>Discount on Products within {discountValue}%</h1>
            <DiscountedProductsComponent discountValue={discountValue} exact={exact} />
        </main>
    )
}

export default Page;