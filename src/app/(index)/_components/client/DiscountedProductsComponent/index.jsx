import React from 'react';
import { getProductsByDiscountedValue } from '@/services/productServices';
import { v4 as uuidv4 } from 'uuid';
import CardComponentOne from '../../shared/server/CardComponentOne';

async function DiscountedProductsComponent({ discountValue, exact }) {
    const { data: dataArr, success, message } = await getProductsByDiscountedValue(discountValue, exact);

    return (
        <section className='flex flex-col gap-12 mt-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
                {
                    dataArr?.length > 0 && dataArr.map(dataObj => <CardComponentOne key={`cardCompOne${uuidv4()}`} id={dataObj?._id} imgSrcUrl={dataObj?.imgUrls.length > 0 ? dataObj?.imgUrls[0] : ""} imgAltText={`${dataObj?.brand} ${dataObj?.productCategory} image`} cardTitle={dataObj?.productTitle} keyFeatures={dataObj?.keyFeatures} status={dataObj?.productStatus} price={dataObj?.price} regularPrice={dataObj?.regularPrice} offer={dataObj?.offer} />)
                }
            </div>
        </section>
    )
}

export default DiscountedProductsComponent;