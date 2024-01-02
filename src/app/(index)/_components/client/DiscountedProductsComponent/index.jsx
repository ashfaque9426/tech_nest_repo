import React from 'react';
import { getProductsByDiscountedValue } from '@/services/productServices';

async function DiscountedProductsComponent({ discountValue, exact }) {
    const { data: dataArr, success, message } = await getProductsByDiscountedValue(discountValue, exact);

    return (
        <section>
            <h2>Products found {dataArr?.length}</h2>
        </section>
    )
}

export default DiscountedProductsComponent;