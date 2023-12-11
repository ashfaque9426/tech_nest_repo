import React from 'react';
import AddAProductForm from '../../_components/client/AddAProductFrom';

export const metadata = {
    title: 'TechNest/Admin/Add Product Page',
    description: 'Here admin can add product details for each particular product which will be stored at MongoDB.',
}

function Page() {
    return (
        <section className='border lg:w-2/3 px-5 py-5'>
            <h1 className='text-2xl font-bold'>Please fill up the product specification form bellow.</h1>
            <AddAProductForm />
        </section>
    )
}

export default Page;