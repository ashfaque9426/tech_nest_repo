import React from 'react';
import { getProductsByDiscountedValue } from '@/services/productServices';

async function DiscountedProductsComponent({ discountValue }) {
    const { data: dataArr, success, message } = await getProductsByDiscountedValue(discountValue);

    return (
        <section>
            <h2>Products found {dataArr?.length}</h2>
        </section>
    )
}

export default DiscountedProductsComponent;