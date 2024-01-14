"use client"
import React, { useEffect, useState } from 'react';

function AllProductsByCategory() {
    const [productArr, setProductArr] = useState([]);
    useEffect(() => { }, []);
    return (
        <>
            <aside role="complementary" aria-labelledby="sidebar-heading">
                <h2 id="sidebar-heading">Sidebar Content</h2>
            </aside>

            <section role='region' aria-labelledby="section-heading">
                <h2 id="section-heading">Accessible Section</h2>
            </section>
        </>
    )
}

export default AllProductsByCategory;