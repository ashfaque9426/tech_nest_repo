"use client"
import { productByCategory } from '@/services/productServices';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CardComponentTwo from '../../shared/server/CardComponentTwo';
import { v4 as uuidv4 } from 'uuid';

function AllProductsByCategoryLayout({ category }) {
    const [productArr, setProductArr] = useState([]);
    const [sortOrder, setSortOrder] = useState('lowToHigh');
    const [processorSidebar, setProcessorSidebar] = useState([{ brandOne: { brand: "Intel", models: ['Intel Pentium', 'Core i3', 'Core i5', 'Core i7', 'Core i9'], socketList: ['LGA1700', 'FCLGA1200', 'LGA2011'] } }, { brandTwo: { brand: "AMD", models: ['Ryzen 3', 'Ryzen 5', 'Ryzen 7', 'Ryzen Threadripper'], socketList: ['AM5', 'sWRX8'] } }]);

    // for changing sort order state
    const handleSortOrderChange = e => {
        setSortOrder(e.target.value);
    }

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
            <aside className='md:w-[25%] md:sticky md:top-0' role="complementary" aria-labelledby="sidebar-heading">
                <h2 className='text-xl font-semibold text-center' id="sidebar-heading">Filtering Options</h2>

                {/* for destop processors side menubar filtering options */}
                {
                    category === "desktop processor" || category === "desktop%20processor" && <div className='flex flex-col gap-5 items-center my-5'>
                        {
                            processorSidebar.map(sidebarComponentObj => (
                                Object.keys(sidebarComponentObj).map(keyObj => (<section className='w-full  rounded-lg shadow-md bg-[#efeded] dark:bg-[#1e1e1e] dark:shadow-none py-5' key={`processorFilteringItems${uuidv4()}`}>
                                    {   
                                        <div className='w-2/3 mx-auto'>
                                            <h3 className='text-lg capitalize font-semibold mb-3'>{sidebarComponentObj[keyObj].brand}</h3>
                                            <ul className='my-2'>
                                                <h4 className='mb-1 font-semibold'>Models:</h4>
                                                {
                                                    sidebarComponentObj[keyObj].models.map(strItem => (
                                                        <li className='hover:cursor-pointer flex items-center gap-1' key={`processorFilteringByModels${uuidv4()}`}>
                                                            <span>
                                                                <form>
                                                                    <input type="checkbox" name="checkbox" />
                                                                </form>
                                                            </span>
                                                            <span>{strItem}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>

                                            <ul className='my-2'>
                                                <h4 className='mb-1 font-semibold'>Sockets:</h4>
                                                {
                                                    sidebarComponentObj[keyObj].socketList.map(strItem => (
                                                        <li className='hover:cursor-pointer flex items-center gap-1' key={`processorFilteringBySocketList${uuidv4()}`}>
                                                            <span>
                                                                <form>
                                                                    <input type="checkbox" name="checkbox" />
                                                                </form>
                                                            </span>
                                                            <span>{strItem}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    }
                                </section>))
                            ))
                        }
                    </div>
                }
            </aside>

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