import React from 'react';
import Form from './components/client/Form';

export const metadata = {
    title: 'TechNest/Admin/Add Product Page',
    description: 'Here admin can add product details for each particular product which will be stored at MongoDB.',
}

function Page() {
    return (
        <section className='border w-2/3'>
            <h1 className='text-2xl font-bold text-center'>This is add a product page</h1>
            <Form />
        </section>
    )
}

export default Page;