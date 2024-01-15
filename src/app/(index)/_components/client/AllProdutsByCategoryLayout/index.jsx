"use client"
import { productByCategory } from '@/services/productServices';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CardComponentTwo from '../../shared/server/CardComponentTwo';
import { v4 as uuidv4 } from 'uuid';

function AllProductsByCategoryLayout({ category }) {
    const [productArr, setProductArr] = useState([]);
    useEffect(() => {
        productByCategory(category).then(result => {
            if (result.success) {
                setProductArr(result.data);
            }else {
                toast.error(result.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        }).catch(err => console.log(err.message));
        
    }, [category]);
    return (
        <>
            <aside className='md:w-[25%] border' role="complementary" aria-labelledby="sidebar-heading">
                <h2 id="sidebar-heading">Sidebar Content</h2>
            </aside>

            <section className='px-5 md:px-0 md:w-[75%]' role='region' aria-labelledby="section-heading">
                <h2 className='text-lg md:text-2xl font-bold mb-5' id="section-heading">{productArr?.length > 0 && productArr[0].productCategory}s:</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
                    {
                        productArr?.length > 0 && productArr.map(productObj => <CardComponentTwo key={`cardCompTwoKey${uuidv4()}`} productObj={productObj} />)
                    }
                </div>
            </section>
        </>
    )
}

export default AllProductsByCategoryLayout;