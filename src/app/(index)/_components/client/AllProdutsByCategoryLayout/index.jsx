"use client"
import { productByCategory } from '@/services/productServices';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CardComponentTwo from '../../shared/server/CardComponentTwo';
import { v4 as uuidv4 } from 'uuid';
import AsideComponentForSameCategoryFiltering from '../AsideComponentForSameCategoryFiltering';

function AllProductsByCategoryLayout({ category }) {
    const [productArr, setProductArr] = useState([]);
    const [sortOrder, setSortOrder] = useState('lowToHigh');
    const [paramStrArr, setParamStrArr] = useState([]);

    // for changing sort order state
    const handleSortOrderChange = e => {
        setSortOrder(e.target.value);
    }

    const handleParamsForUrl = (str) => {
        setParamStrArr(prevStr => paramStrArr.includes(str) ? paramStrArr.filter(arrStr => str !== arrStr) : [...prevStr, str]);
    }

    useEffect(() => {
        if (paramStrArr.length > 0) {
            console.log(paramStrArr)
        }
    }, [paramStrArr]);

    useEffect(() => {
        productByCategory(category).then(result => {
            if (result.success) {
                // sorting data according to sort product and loading data on page load.
                setProductArr(sortOrder === 'lowToHigh' && result.data || sortOrder === 'highToLow' && result.data.sort(function (a, b) {
                    return b.regularPrice - a.regularPrice;
                }));
            }else {
                // show error if unable to get products for some reason.
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
        
    }, [category, sortOrder]);
    return (
        <>
            <AsideComponentForSameCategoryFiltering category={category} handleParamsForUrl={handleParamsForUrl} />

            {/* Product display section */}
            <section className='md:w-[75%]' role='region' aria-labelledby="section-heading">
                <h2 className='mb-5 flex justify-between items-center' id="section-heading"><span className='text-lg md:text-2xl font-bold'>{productArr?.length > 0 && productArr[0].productCategory + 's:'}</span> <span><label className='text-lg font-semibold mr-2' htmlFor="sortOrder">Sort By Price:</label>
                    <select onChange={handleSortOrderChange} id="sortOrder" name="sortOrder" className="p-2 border border-gray-300 rounded cursor-pointer focus:border-gray-500 dark:bg-[#1e1e1e]">
                        <option value="lowToHigh">Low to High</option>
                        <option value="highToLow">High to Low</option>
                    </select></span></h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 5xl:grid-cols-4 gap-5'>
                    {
                        productArr?.length > 0 && productArr.map(productObj => <CardComponentTwo className='bg-[#fcfcfc]' key={`cardCompTwoKey${uuidv4()}`} productObj={productObj} />)
                    }
                </div>
            </section>
        </>
    )
}

export default AllProductsByCategoryLayout;