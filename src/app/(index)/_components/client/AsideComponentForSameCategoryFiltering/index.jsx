"use client";
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function AsideComponentForSameCategoryFiltering({ category, handleParamsForUrl }) {
    const [indexArr, setIndexArr] = useState([]);
    const [processorSidebar, setProcessorSidebar] = useState([{ brandOne: { brand: "Intel", models: ['Intel Pentium', 'Core i3', 'Core i5', 'Core i7', 'Core i9'], socketList: ['LGA1700', 'FCLGA1200', 'LGA2011'] } }, { brandTwo: { brand: "AMD", models: ['Ryzen 3', 'Ryzen 5', 'Ryzen 7', 'Ryzen 9', 'Ryzen Threadripper'], socketList: ['AM5', 'sWRX8'] } }]);

    return (
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
                                                sidebarComponentObj[keyObj].models.map((strItem, i) => (
                                                    <li onClick={() => handleParamsForUrl(strItem)} className='hover:cursor-pointer flex items-center gap-1' key={`processorFilteringByModels${uuidv4()}`}>
                                                        <label onClick={() => setIndexArr(prevIndexs => indexArr.includes(i + strItem) ? indexArr.filter(indexFromArr => indexFromArr !== i + strItem) : [...prevIndexs, i + strItem])}>
                                                            <input className='mr-2' type="checkbox" name={`checkbox-${uuidv4()}`} checked={indexArr.includes(i + strItem)} onChange={() => setIndexArr(prevIndexs => indexArr.includes(i + strItem) ? indexArr.filter(indexFromArr => indexFromArr !== i + strItem) : [...prevIndexs, i + strItem])} />
                                                            <span onClick={() => setIndexArr(prevIndexs => indexArr.includes(i + strItem) ? indexArr.filter(indexFromArr => indexFromArr !== i + strItem) : [...prevIndexs, i + strItem])}>{strItem}</span>
                                                        </label>
                                                    </li>
                                                ))
                                            }
                                        </ul>

                                        <ul className='my-2'>
                                            <h4 className='mb-1 font-semibold'>Sockets:</h4>
                                            {
                                                sidebarComponentObj[keyObj].socketList.map((strItem, i) => (
                                                    <li onClick={() => handleParamsForUrl(strItem)} className='hover:cursor-pointer flex items-center gap-1' key={`processorFilteringBySocketList${uuidv4()}`}>
                                                        <label onClick={() => setIndexArr(prevIndexs => indexArr.includes(i + strItem) ? indexArr.filter(indexFromArr => indexFromArr !== i + strItem) : [...prevIndexs, i + strItem])}>
                                                            <input className='mr-2' type="checkbox" name={`checkbox-${uuidv4()}`} checked={indexArr.includes(i + strItem)} onChange={() => setIndexArr(prevIndexs => indexArr.includes(i + strItem) ? indexArr.filter(indexFromArr => indexFromArr !== i + strItem) : [...prevIndexs, i + strItem])} />
                                                            <span onClick={() => setIndexArr(prevIndexs => indexArr.includes(i + strItem) ? indexArr.filter(indexFromArr => indexFromArr !== i + strItem) : [...prevIndexs, i + strItem])}>{strItem}</span>
                                                        </label>
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
    )
}

export default AsideComponentForSameCategoryFiltering;