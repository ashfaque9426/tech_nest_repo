import React from 'react'
import AddBannerDataForm from '../../_components/client/AddBannerDataForm';

export const metadata = {
    title: 'TechNest/Admin/Banner Info Page',
    description: 'Here a User as an Admin can provide banner information to display in homepage.',
}

function Page() {
    return (
        <main className='lg:w-[85%] h-[calc(100vh-10vh)] flex flex-col justify-center items-center gap-5 2xl:w-2/3' role='main' aria-labelledby='subMainContentLabel'>
            <h1 id='subMainContentLabel' className='text-2xl font-bold'>Add Banner Details</h1>
            <AddBannerDataForm apiKey={process.env.imgBB_ApiKey} />
        </main>
    )
}

export default Page;