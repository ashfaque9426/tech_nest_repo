import React from 'react'
import AddBannerDataForm from '../../_components/client/AddBannerDataForm';

function Page() {
    return (
        <main className='lg:w-[85%] h-[calc(100vh-10vh)] flex justify-center items-center 2xl:w-2/3' role='main'>
            <AddBannerDataForm apiKey={process.env.imgBB_ApiKey} />
        </main>
    )
}

export default Page;