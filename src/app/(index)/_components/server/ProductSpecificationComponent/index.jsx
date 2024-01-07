import React from 'react';
import { fromCamelCase } from '@/utils';
import { v4 as uuidv4 } from 'uuid';

function ProductSpecificationComponent({ ProductSpecificationsArr }) {
    // returing html table structure as jsx elements nested inside a sigle div element.
    return (
        <div>
            {
                // iterating through props array
                ProductSpecificationsArr.map(productSpecsObj => <section className='mb-12 md:my-12' key={uuidv4()}>
                    {
                        // iterating through objects of that array
                        Object.keys(productSpecsObj).map(keyObjTitle => <table className='table-auto flex flex-col gap-3 dark:gap-2' key={`individualSpecs${uuidv4()}`}>
                            {/* iterating through nested of objects for each object obtained from ProductSpecificationsArr(array received as props) */}
                            {
                                <>
                                    <thead className='bg-gray-800 text-white dark:bg-[#2a2424] p-2 xl:px-8'>
                                        <tr className='text-lg font-semibold capitalize mt-8'><td colSpan="2">{fromCamelCase(keyObjTitle)}:</td></tr>
                                    </thead>

                                    {/* iterating through nested object of those retrieved objects for each object */}
                                    <tbody className='flex flex-col gap-1'>
                                        {
                                            Object.keys(productSpecsObj[keyObjTitle]).map((key, index) => <tr className={`text-md py-2 ${index % 2 === 0 ? 'bg-[#f0f6fb] dark:bg-[#585657]' : 'bg-[#fbfbfb] dark:bg-[#2c2b2b]'}`} key={`individualSpecListItem${uuidv4()}`}>
                                                <td className='capitalize font-semibold leading-5 ps-2 xl:ps-16'>{fromCamelCase(key)}:</td><td className='px-2'>{productSpecsObj[keyObjTitle][key]}</td>
                                            </tr>)
                                        }
                                    </tbody>
                                </>
                            }
                        </table>)
                    }
                </section>)
            }
        </div>
    )
}

export default ProductSpecificationComponent;