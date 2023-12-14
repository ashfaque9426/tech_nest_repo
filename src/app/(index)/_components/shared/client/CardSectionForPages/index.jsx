"use client"
import React, { useEffect, useState } from 'react'
import CardComponentZero from '../../server/CardComponentZoro';
import { v4 as uuidv4 } from 'uuid';

function CardSectionForPages({ title, fetchData }) {
    const [dataArr, setDataArr] = useState([]);

    useEffect(() => {
        fetchData.then(data => {
            setDataArr(data.data);
            console.log(data.data)
        })
    }, [fetchData]);

    return (
        <section>
            <h2 className='font-bold text-lg my-3'>{title}</h2>
            <div className='flex flex-wrap gap-2 items-center'>
                {
                    dataArr.length > 0 && dataArr.map(dataObj => (

                        <CardComponentZero key={`uniqueKeyForCardCompZero${uuidv4()}`} imgSrcUrl={dataObj?.imgUrls.length > 0 ? dataObj?.imgUrls[0] : ""} altTextForImg={`${dataObj?.brand} ${dataObj?.productCategory} image`} cardTitle={dataObj?.productTitle} status={dataObj?.productStatus} price={dataObj?.price} points={dataObj?.points} offer={dataObj?.offer} date={dataObj?.createdAt} />

                    ))
                }
            </div>
        </section>
    )
}

export default CardSectionForPages;