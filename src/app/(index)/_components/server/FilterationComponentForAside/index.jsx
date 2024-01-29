import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import LiComponentForAsideCompFiltering from '../../client/LiComponentForAsideCompFiltering';
import { fromCamelCase } from '@/utils';

function FilterationComponentForAside({ sidebarArr, handleParamsForUrl, indexArr, setIndexArr, multipleArrOfObjs }) {
  return (
    <>
        {
              multipleArrOfObjs && <div className='flex flex-col gap-5 items-center my-5'>
                  {
                      // given state here will be always an array.
                      sidebarArr.map(sidebarComponentObj => (
                          Object.keys(sidebarComponentObj).map(keyObj => (<section className='w-full  rounded-lg shadow-md bg-[#efeded] dark:bg-[#1e1e1e] dark:shadow-none py-8' key={`processorFilteringItems${uuidv4()}`}>
                              {
                                  <div className='w-2/3 3xl:w-[45%] mx-auto'>
                                      {/* for main title such as brand name. */}
                                      <h3 className='text-lg capitalize font-semibold mb-3'><span className={`${sidebarComponentObj[keyObj].brand === 'Intel' && 'px-3 py-1 rounded-xl bg-[#006bae]' || sidebarComponentObj[keyObj].brand === 'AMD' && 'px-3 py-1 rounded-xl bg-[#c94c2e]'}`}>{sidebarComponentObj[keyObj][Object.keys(sidebarComponentObj[keyObj])[0]]}</span></h3>

                                      {
                                          Object.keys(sidebarComponentObj[keyObj]).map(indexStr => (
                                              Array.isArray(sidebarComponentObj[keyObj][indexStr]) && <ul className='my-2 3xl:my-5' key={`processFilteringUnorderedList${uuidv4()}`}>
                                                  {/* for sub main title such as what is a list of item about in this ul */}
                                                  <h4 key={`headingElem${uuidv4()}`} className='mb-1 font-semibold capitalize'>{fromCamelCase(indexStr)}</h4>

                                                  {/* iterate through the array from the object of given state and return li component. */}
                                                  {
                                                      sidebarComponentObj[keyObj][indexStr].map((strItem, i) => (
                                                          <LiComponentForAsideCompFiltering key={`processorFilteringByModels${uuidv4()}`} strItem={strItem} i={i} handleParamsForUrl={handleParamsForUrl} indexArr={indexArr} setIndexArr={setIndexArr} />
                                                      ))
                                                  }
                                              </ul>
                                          ))
                                      }
                                  </div>
                              }
                          </section>))
                      ))
                  }
              </div>
        }

        {
              <div className='w-full flex flex-col gap-5 3xl:gap-0 my-6 3xl:my-0'>
                  {
                      !multipleArrOfObjs && sidebarArr.map(sidebarObj => (
                          Object.keys(sidebarObj).map(sidebarObjKey => (
                              <ul className='w-full  mx-auto rounded-lg shadow-md bg-[#efeded] dark:bg-[#1e1e1e] dark:shadow-none py-8 px-5 3xl:my-5' key={`sidebarUL2${uuidv4()}`}>
                                  <h4 key={`headingElem${uuidv4()}`} className='mb-1 font-semibold capitalize'>{fromCamelCase(sidebarObjKey)}</h4>
                                  {
                                      sidebarArr[0][sidebarObjKey].map((strItem, i) => (
                                          <LiComponentForAsideCompFiltering key={`processorFilteringByModels${uuidv4()}`} strItem={strItem} i={i} handleParamsForUrl={handleParamsForUrl} indexArr={indexArr} setIndexArr={setIndexArr} />
                                      ))
                                  }
                              </ul>
                          ))

                      ))
                  }
              </div>
        }
    </>
  )
}

export default FilterationComponentForAside