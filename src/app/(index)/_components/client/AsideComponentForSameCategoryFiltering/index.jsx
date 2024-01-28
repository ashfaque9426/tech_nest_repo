"use client";
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LiComponentForAsideCompFiltering from '../LiComponentForAsideCompFiltering';

function AsideComponentForSameCategoryFiltering({ category, handleParamsForUrl }) {
    // initializing states
    // for checkboxes
    const [indexArr, setIndexArr] = useState([]);

    // for processor Filtering options
    const [processorSidebar, setProcessorSidebar] = useState([{ brandOne: { brand: "Intel", models: ['Intel Pentium', 'Core i3', 'Core i5', 'Core i7', 'Core i9'], socketList: ['LGA1700', 'FCLGA1200', 'LGA2011'] } }, { brandTwo: { brand: "AMD", models: ['Ryzen 3', 'Ryzen 5', 'Ryzen 7', 'Ryzen 9', 'Ryzen Threadripper'], socketList: ['AM5', 'sWRX8'] } }]);

    // for laptop Filtering options
    const [laptopSidebar, setLaptopSidebar] = useState([{ brandList: ["MSI", "Asus", "HP", "GIGABYTE", "Lenovo", "Chuwi"], ramSizes: ["8GB", "16GB", "32GB"], ramType: ["DDR4", "DDR5"], storageLists: ["256GB", "512GB", "1TB"], displayType: ["FHD", "OLED", "WQXGA", "OLED Touch"], displaySize: ['15.6', '14', '14.1', '16'], graphicsList: ["RTX 4060 8GB GDDR6", "Intel UHD Graphics 600", "GeForce RTX 3070 8GB", "RTX 4050 6GB GDDR6", "NVIDIA GeForce RTX 3050Ti 4GB GDDR6", "AMD Radeon", "Intel Iris Xe", "Intel UHD Graphics"], warrantyLists: ["1 year", "2 years", "3 years"] }]);

    // for smartPhone Filtering options
    const [phoneSidebar, setPhoneSidebar] = useState([{ brandList: ["Xiaomi", "Samsung", "Apple", "Vivo", "Nokia", "Google", "One Plus", "OPPO"], displaySize: ['6.67', '6.5', '6.1', '6.3', '6.51', '6.52', '6.56'], displayType: ["HD+", "FHD+", "Super Retina XDR", "Liquid Retina HD", "OLED"], cameraType: ["16", "13+2", "12", "48", "50+2", "8"], batteryType: ["5000 mAh", "4355 mAh", "5050 mAh", "4000 mAh"] }]);

    return (
        <aside className='md:w-[25%]' role="complementary" aria-labelledby="sidebar-heading">
            <h2 className='text-xl font-semibold text-center mt-2' id="sidebar-heading">Filtering Options</h2>

            {/* for destop processors side menubar filtering options */}
            {
                category === "desktop processor" || category === "desktop%20processor" && <div className='flex flex-col gap-5 items-center my-5'>
                    {
                        processorSidebar.map(sidebarComponentObj => (
                            Object.keys(sidebarComponentObj).map(keyObj => (<section className='w-full  rounded-lg shadow-md bg-[#efeded] dark:bg-[#1e1e1e] dark:shadow-none py-8' key={`processorFilteringItems${uuidv4()}`}>
                                {
                                    <div className='w-2/3 3xl:w-[45%] mx-auto'>
                                        <h3 className='text-lg capitalize font-semibold mb-3'><span className={`${sidebarComponentObj[keyObj].brand === 'Intel' && 'px-3 py-1 rounded-xl bg-[#006bae]' || sidebarComponentObj[keyObj].brand === 'AMD' && 'px-3 py-1 rounded-xl bg-[#c94c2e]'}`}>{sidebarComponentObj[keyObj].brand}</span></h3>
                                        <ul className='my-2 3xl:my-5'>
                                            <h4 className='mb-1 font-semibold'>Models:</h4>
                                            {
                                                sidebarComponentObj[keyObj].models.map((strItem, i) => (
                                                    <LiComponentForAsideCompFiltering key={`processorFilteringByModels${uuidv4()}`} strItem={strItem} i={i} handleParamsForUrl={handleParamsForUrl} indexArr={indexArr} setIndexArr={setIndexArr} />
                                                ))
                                            }
                                        </ul>

                                        <ul className='my-2'>
                                            <h4 className='mb-1 font-semibold'>Sockets:</h4>
                                            {
                                                sidebarComponentObj[keyObj].socketList.map((strItem, i) => (
                                                    <LiComponentForAsideCompFiltering key={`processorFilteringByModels${uuidv4()}`} strItem={strItem} i={i} handleParamsForUrl={handleParamsForUrl} indexArr={indexArr} setIndexArr={setIndexArr} />
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

            {/* for laptop Filtering options */}

        </aside>
    )
}

export default AsideComponentForSameCategoryFiltering;