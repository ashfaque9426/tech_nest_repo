"use client";
import React, { useState } from 'react';
import FilterationComponentForAside from '../../server/FilterationComponentForAside';

function AsideComponentForSameCategoryFiltering({ category, brand, handleParamsForUrl }) {
    // initializing states
    // for checkboxes
    const [indexArr, setIndexArr] = useState([]);

    // for processor Filtering options
    const [processorSidebar, setProcessorSidebar] = useState([{ brandOne: { brand: "Intel", models: ['Intel Pentium', 'Core i3', 'Core i5', 'Core i7', 'Core i9'], socketList: ['LGA1700', 'FCLGA1200', 'LGA2011'] } }, { brandTwo: { brand: "AMD", models: ['Ryzen 3', 'Ryzen 5', 'Ryzen 7', 'Ryzen 9', 'Ryzen Threadripper'], socketList: ['AM5', 'sWRX8'] } }]);

    // for laptop Filtering options
    const [laptopSidebar, setLaptopSidebar] = useState([{ brandList: ["MSI", "Asus", "HP", "GIGABYTE", "Lenovo", "Chuwi"], ramSizes: ["8GB", "16GB", "32GB"], ramType: ["DDR4", "DDR5"], processorType: ["Intel", "AMD"], storageLists: ["256GB", "512GB", "1TB"], displayType: ["FHD", "OLED", "WQXGA", "OLED Touch"], displaySize: ['15.6"', '14', '14.1"', '16"'], graphicsList: ["RTX 4060 8GB GDDR6", "Intel UHD Graphics 600", "GeForce RTX 3070 8GB", "RTX 4050 6GB GDDR6", "NVIDIA GeForce RTX 3050Ti 4GB GDDR6", "AMD Radeon", "Intel Iris Xe", "Intel UHD Graphics"], warrantyLists: ["1 year", "2 years", "3 years"] }]);

    // for smartPhone Filtering options
    const [phoneSidebar, setPhoneSidebar] = useState([{ brandList: ["Xiaomi", "Samsung", "Apple", "Vivo", "Nokia", "Google", "One Plus", "OPPO"], displaySize: ['6.67"', '6.5"', '6.1"', '6.3"', '6.51"', '6.52"', '6.56"'], displayType: ["HD+", "FHD+", "Super Retina XDR", "Liquid Retina HD", "OLED"], cameraType: ["16 MP", "13+2 MP", "12 MP", "48 MP", "50+2 MP", "8 MP"], batteryType: ["5000 mAh", "4355 mAh", "5050 mAh", "4000 mAh"] }]);

    return (
        <aside className='md:w-[25%]' role="complementary" aria-labelledby="sidebar-heading">
            <h2 className='text-xl font-semibold text-center mt-2' id="sidebar-heading">Filtering Options</h2>

            {/* for destop processors side menubar filtering options */}
            {
                category === "desktop processor" || category === "desktop%20processor" && <FilterationComponentForAside sidebarArr={processorSidebar} handleParamsForUrl={handleParamsForUrl} indexArr={indexArr} setIndexArr={setIndexArr} multipleArrOfObjs={true} />
            }

            {/* for laptop Filtering options */}
            {
                category === "laptop" && <FilterationComponentForAside sidebarArr={laptopSidebar} handleParamsForUrl={handleParamsForUrl} indexArr={indexArr} setIndexArr={setIndexArr} multipleArrOfObjs={false} />
            }


            {/* for phone Filtering options */}
            {
                category === "smart%20phone" && <FilterationComponentForAside sidebarArr={phoneSidebar} handleParamsForUrl={handleParamsForUrl} indexArr={indexArr} setIndexArr={setIndexArr} multipleArrOfObjs={false} />
            }

        </aside>
    )
}

export default AsideComponentForSameCategoryFiltering;