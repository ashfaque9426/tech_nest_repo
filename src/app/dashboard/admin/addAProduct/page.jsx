import React from 'react';
import AddAProductForm from '../../_components/client/AddAProductFrom';

export const metadata = {
    title: 'TechNest/Admin/Add Product Page',
    description: 'Here admin can add product details for each particular product which will be stored at MongoDB.',
}

function Page() {
    const apiKey = process.env.imgBB_ApiKey;
    return (
        <main className='border lg:w-2/3 px-5 py-5' role="main" aria-labelledby="subMainContentLabel">
            <h1 id='subMainContentLabel' className='text-2xl font-bold'>Please fill up the product specification form bellow.</h1>
            <AddAProductForm apiKey={apiKey} />
        </main>
    )
}

export default Page;