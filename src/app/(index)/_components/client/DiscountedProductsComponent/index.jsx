import React from 'react';
import { getProductsByDiscountedValue } from '@/services/productServices';
import { v4 as uuidv4 } from 'uuid';
import CardComponentOne from '../../shared/server/CardComponentOne';

async function DiscountedProductsComponent({ discountValue, exact }) {
    const { data: dataArr, success, message=false } = await getProductsByDiscountedValue(discountValue, exact);

    return (
        <main className='flex flex-col gap-12 mt-5 mx-5 xl:mx-auto' role='main' aria-labelledby='subMainContentLabel'>
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
                {
                    dataArr?.length > 0 && dataArr.map(dataObj => <CardComponentOne key={`cardCompOne${uuidv4()}`} id={dataObj?._id} imgSrcUrl={dataObj?.imgUrls.length > 0 ? dataObj?.imgUrls[0] : ""} imgAltText={`${dataObj?.brand} ${dataObj?.productCategory} image`} cardTitle={dataObj?.productTitle} keyFeatures={dataObj?.keyFeatures} status={dataObj?.productStatus} price={dataObj?.price} regularPrice={dataObj?.regularPrice} offer={dataObj?.offer} />)
                }
            </section>
        </main>
    )
}

export default DiscountedProductsComponent;