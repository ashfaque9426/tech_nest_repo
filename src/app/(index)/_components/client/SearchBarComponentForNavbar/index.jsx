"use client";
import { getProductSuggestions } from '@/services/productServices';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';

function SearchBarComponentForNavbar() {
    const [searchBarStr, setSearchBarStr] = useState("");
    const [searchedProductArr, setSearchedProductArr] = useState([]);
    const [responseMessage, setResponseMessage] = useState(false);
    const [seachResultVisibility, setSearchResultVisibility] = useState(false);
    const sectionRef = useRef();

    const handleVisibility = () => {
        setSearchBarStr("");
        setSearchedProductArr([]);
        setSearchResultVisibility(false);
        setResponseMessage(false);
    }

    useEffect(() => {
        const targetedSection = seachResultVisibility && sectionRef.current && document.getElementById('suggestion');

        const handleVisibility = (e) => {
            if (seachResultVisibility && sectionRef.current && !targetedSection.contains(e.target)) {
                setSearchResultVisibility(false);
            }
        }

        document.addEventListener('click', handleVisibility);

        return () => {
            document.removeEventListener('click', handleVisibility);
        };
    }, [seachResultVisibility])

    useEffect(() => {
        if (searchBarStr.length > 0) {
            setSearchResultVisibility(true);
            getProductSuggestions(searchBarStr).then(result => {
                if (result.success) {
                    setResponseMessage(false);
                    setSearchedProductArr(result.data);
                }

                if (result.message) {
                    setSearchedProductArr([]);
                    setResponseMessage(result.message);
                }
            });
        } else {
            setSearchResultVisibility(false);
        }
    }, [searchBarStr]);

  return (
      <form onSubmit={(e) => e.preventDefault()} className="w-full relative flex-1 flex items-center">
          <section className={`overflow-clip w-full border dark:border-none border-[#e5e7eb] rounded-lg ${seachResultVisibility && 'rounded-br-none rounded-bl-none'}`}>
              <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-2 py-1 dark:text-black focus:outline-none"
                  value={searchBarStr}
                  onChange={(e) => setSearchBarStr(e.target.value)}
              />
              <span className="absolute top-1 right-0 dark:text-black pe-3 py-1 cursor-default">
                  <BsSearch />
              </span>
        </section>
          {
              searchBarStr.length > 0 && seachResultVisibility && <section id='suggestion' ref={sectionRef} className={`absolute top-7 z-auto w-full bg-[#ffffff] text-black border border-t-0 rounded-br-lg rounded-bl-lg p-5`}>
                  <ul className='relative z-50 flex flex-col gap-5'>
                    {
                        !responseMessage && searchedProductArr.length > 0 && searchedProductArr.map(productObj => (
                            <li key={`suggestion${uuidv4()}`}>
                                <Link onClick={handleVisibility} className='hover:underline' href={`/singleProduct/${productObj._id}`}>
                                    {productObj.productTitle}
                                </Link>
                            </li>
                        ))
                    }

                    {
                        seachResultVisibility &&  responseMessage?.length > 0 && <li>{responseMessage}</li>
                    }
                </ul>
            </section>
          }
      </form>
  )
}

export default SearchBarComponentForNavbar;