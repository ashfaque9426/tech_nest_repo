import React from 'react';

function Sidebar() {
  return (
    <aside className='border w-1/3' role="complementary" aria-labelledby="sidebarLabel">
      <h2 id="sidebarLabel" className='text-xl text-red-500 text-center font-bold'>Sidebar</h2>
    </aside>
  )
}

export default Sidebar;