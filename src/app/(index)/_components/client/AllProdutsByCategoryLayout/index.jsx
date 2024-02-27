"use client"
import { getProductsByBrandName, productByCategory, productsBySearchStrings } from '@/services/productServices';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CardComponentTwo from '../../shared/server/CardComponentTwo';
import { v4 as uuidv4 } from 'uuid';
import AsideComponentForSameCategoryFiltering from '../AsideComponentForSameCategoryFiltering';
import { GiHamburgerMenu } from "react-icons/gi";


function AllProductsByCategoryLayout({ category, brand }) {
    const [productArr, setProductArr] = useState([]);
    const [sortOrder, setSortOrder] = useState('lowToHigh');
    const [paramStrArr, setParamStrArr] = useState([]);
    const [resMsgStr, setResMsgStr] = useState("");
    const [chkBrandChecked, setChkBrandChecked] = useState(false);
    const [sidebarVisibility, setSidebarVisibility] = useState(false);

    // for changing sort order state
    const handleSortOrderChange = e => {
        setSortOrder(e.target.value);
    }

    const handleParamsForUrl = (str) => {
        setParamStrArr(prevStr => paramStrArr.includes(str) ? paramStrArr.filter(arrStr => str !== arrStr) : [...prevStr, str]);
    }

    useEffect(() => {
        let url = `http://localhost:3000/api/getProductsBySearchString?category=${category}&searchStr=`;
        
        // adding search params as searchStr to the url to according to paramStrArr strings.
        if (paramStrArr.length > 0) {
            for (let i = 0; i < paramStrArr.length; i++) {
                if (paramStrArr[i].includes(" ")) {
                    const newStr = paramStrArr[i].replace(/ +/g, '%20');
                    if(i !== 0) {
                        // adding plus sign after each string for seperation and here ; is a special character indended for special functionality.
                        url += ";" + newStr + "+";
                    }else {
                        url += newStr + "+";
                    }
                    
                } else {
                    if(i !== 0) {
                        url += ";" + paramStrArr[i] + "+";
                    } else {
                        url += paramStrArr[i] + "+";
                    }
                    
                }
            }
            url = url.slice(0, -1);

            if (chkBrandChecked) url += `&brandChecked=${chkBrandChecked}`;

            if(brand !== "none") {
                url += `&brand=${brand}`;
            }
            
            productsBySearchStrings(url, 10).then(resData => {
                if (resData.success) {
                    setProductArr(sortOrder === 'lowToHigh' && resData.data || sortOrder === 'highToLow' && resData.data.sort(function (a, b) {
                        return b.regularPrice - a.regularPrice;
                    }));
                    setResMsgStr("");
                }

                if (resData.message) {
                    setResMsgStr(resData.message);
                }
            }).catch(err => console.log(err.message));
        }
    }, [category, paramStrArr, chkBrandChecked, sortOrder, brand]);

    useEffect(() => {
        if (paramStrArr.length > 0) return;
        if(paramStrArr.length === 0) {
            // getting all products according to category.
            brand === 'none' && productByCategory(category).then(result => {
                if (result.success) {
                    // emptying error msg state to empty string.
                    setResMsgStr("");
                    // sorting data according to sort product and loading data on page load.
                    setProductArr(sortOrder === 'lowToHigh' && result.data || sortOrder === 'highToLow' && result.data.sort(function (a, b) {
                        return b.regularPrice - a.regularPrice;
                    }));
                } else {
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

            brand !== 'none' && getProductsByBrandName(brand, 0, category).then(result => {
                
                if (result.success) {
                    // emptying error msg state to empty string.
                    setResMsgStr("");
                    // sorting data according to sort product and loading data on page load.
                    setProductArr(sortOrder === 'lowToHigh' && result.data || sortOrder === 'highToLow' && result.data.sort(function (a, b) {
                        return b.regularPrice - a.regularPrice;
                    }));
                } else {
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
        }
        
    }, [paramStrArr, category, sortOrder, brand]);
    return (
        <>
            {/* Hamburger Menu */}
            <span onClick={() => setSidebarVisibility(!sidebarVisibility)} className='md:hidden text-3xl'><GiHamburgerMenu /></span>

            {/* sidebar component */}
            <AsideComponentForSameCategoryFiltering className={`${sidebarVisibility ? 'block' : 'hidden'} md:block`} category={category} brand={brand} handleParamsForUrl={handleParamsForUrl} setChkBrandChecked={setChkBrandChecked} />

            {/* Product display section */}
            <section className='md:w-[75%]' role='region' aria-labelledby="section-heading">
                <h2 className='mb-5 flex flex-col md:flex-row md:justify-between md:items-center' id="section-heading">
                    <span className='text-xl font-bold md:text-2xl text-center md:text-start mb-5 md:mb-0'>
                        {productArr?.length > 0 && productArr[0].productCategory + 's:'}
                    </span> 
                    <span className='flex justify-between md:justify-normal items-center'>
                        <label className='text-xl font-semibold mr-2' htmlFor="sortOrder">Sort By Price:</label>
                        <select onChange={handleSortOrderChange} id="sortOrder" name="sortOrder" className="p-2 border border-gray-300 rounded cursor-pointer focus:border-gray-500 dark:bg-[#1e1e1e]">
                            <option value="lowToHigh">Low to High</option>
                            <option value="highToLow">High to Low</option>
                        </select>
                    </span>
                </h2>

                {/* if there is any response msg display that msg. */}
                {
                    resMsgStr?.length > 0 && <div className='sticky top-1/3 my-5 flex justify-center'>
                        <h3 className='text-xl text-yellow-600 font-semibold mt-36'>{resMsgStr}</h3>
                    </div>
                }
                
                {/* if there is no res msg and productArr has at least one product object display the bellow div. */}
                {
                    resMsgStr?.length === 0 && productArr?.length > 0 && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 5xl:grid-cols-4 gap-5'>
                        {
                            productArr.map(productObj => <CardComponentTwo className='bg-[#fcfcfc]' key={`cardCompTwoKey${uuidv4()}`} productObj={productObj} />)
                        }
                    </div>
                }
            </section>
        </>
    )
}

export default AllProductsByCategoryLayout;