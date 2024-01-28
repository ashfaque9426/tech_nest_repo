"use client";
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LiComponentForAsideCompFiltering from '../LiComponentForAsideCompFiltering';

function AsideComponentForSameCategoryFiltering({ category, handleParamsForUrl }) {
    const [indexArr, setIndexArr] = useState([]);
    const [processorSidebar, setProcessorSidebar] = useState([{ brandOne: { brand: "Intel", models: ['Intel Pentium', 'Core i3', 'Core i5', 'Core i7', 'Core i9'], socketList: ['LGA1700', 'FCLGA1200', 'LGA2011'] } }, { brandTwo: { brand: "AMD", models: ['Ryzen 3', 'Ryzen 5', 'Ryzen 7', 'Ryzen 9', 'Ryzen Threadripper'], socketList: ['AM5', 'sWRX8'] } }]);

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
        </aside>
    )
}

export default AsideComponentForSameCategoryFiltering;