import React from 'react';

export const metadata = {
  title: 'Dashboard/Home Page',
  description: 'Dashboard Home Page for users to learn about monitoring and features.',
}

function Page() {
  return (
    <main className='border w-2/3' role="main" aria-labelledby="subMainContentLabel">
      <h1 id='subMainContentLabel' className='text-2xl font-bold text-center'>This is Dashboard Main page</h1>
    </main>
  )
}

export default Page;