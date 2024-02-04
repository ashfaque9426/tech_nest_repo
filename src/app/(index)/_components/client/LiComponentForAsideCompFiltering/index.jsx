"use client";
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function LiComponentForAsideCompFiltering({ strItem, strItemXTN, i, handleParamsForUrl, indexArr, setIndexArr, sidebarObjKey, setChkBrandChecked, multipleObjsOfStateArr }) {
    const onClickActions = () => {
        if (sidebarObjKey === 'brandList') handleParamsForUrl('br-'+strItem);
        else handleParamsForUrl(strItem);
        
        if (!multipleObjsOfStateArr) {
            const regex = new RegExp(/brandList\d./, 'i');
            // console.log(!indexArr.some(elemStr => regex.test(elemStr)));
            if (sidebarObjKey === 'brandList') setChkBrandChecked(true);
            if (sidebarObjKey !== 'brandList' && !indexArr.some(elemStr => regex.test(elemStr))) setChkBrandChecked(false);
        }
    }
    return (
        <li onClick={onClickActions} className='hover:cursor-pointer flex items-center gap-1' key={`processorFilteringByModels${uuidv4()}`}>
            <label onClick={() => setIndexArr(prevIndexs => sidebarObjKey === 'brandList' ? indexArr.includes(sidebarObjKey + i + strItem) ? indexArr.filter(indexFromArr => indexFromArr !== sidebarObjKey + i + strItem) : [...prevIndexs, sidebarObjKey + i + strItem] : indexArr.includes(i + strItem) ? indexArr.filter(indexFromArr => indexFromArr !== i + strItem) : [...prevIndexs, i + strItem])}>
                <input className='mr-2' type="checkbox" name={`checkbox-${uuidv4()}`} checked={sidebarObjKey === 'brandList' ? indexArr.includes(sidebarObjKey + i + strItem) : indexArr.includes(i + strItem)} readOnly />
                <span>{strItem} {strItemXTN && strItemXTN}</span>
            </label>
        </li>
    )
}

export default LiComponentForAsideCompFiltering;