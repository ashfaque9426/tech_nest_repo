"use client";
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function LiComponentForAsideCompFiltering({ strItem, strItemXTN, i, handleParamsForUrl, indexStr, indexArr, setIndexArr, sidebarObjKey, setChkBrandChecked, multipleObjsOfStateArr }) {
    const onClickActions = () => {
        // setting the index array with the index of the brand if the sidebarObjKey value is 'brandList' for multiple brand name concatenated with index number and with the value of strItem so that brand names are to be checked on click of specific brand name or multiple brand names and if not the brand name then index number concated with the strItem variable (its for checking on the input:checkbox item).
        setIndexArr(prevIndexs => sidebarObjKey === 'brandList' ? indexArr.includes(sidebarObjKey + i + strItem) ? indexArr.filter(indexFromArr => indexFromArr !== sidebarObjKey + i + strItem) : [...prevIndexs, sidebarObjKey + i + strItem] : indexArr.includes(i + strItem) ? indexArr.filter(indexFromArr => indexFromArr !== i + strItem) : [...prevIndexs, i + strItem]);

        // console.log(indexStr);
        if (sidebarObjKey === 'brandList') handleParamsForUrl('br-' + strItem);
        else if (sidebarObjKey === 'brand') handleParamsForUrl('singleBr-' + strItem);
        else if (indexStr === 'models') handleParamsForUrl('cpuMod-' + strItem);
        else if (sidebarObjKey === 'models') handleParamsForUrl('mod-' + strItem);
        else if (sidebarObjKey === 'soketLists' || indexStr === 'socketList') handleParamsForUrl('soc-' + strItem);
        else if (sidebarObjKey === 'storageLists') handleParamsForUrl('storlts-' + strItem);
        else if (sidebarObjKey === 'ramSizes') handleParamsForUrl('rms-' + strItem);
        else if (sidebarObjKey === 'ramType' || sidebarObjKey === 'supportedMemory') handleParamsForUrl('supm-' + strItem);
        else if (sidebarObjKey === 'supportedSlots') handleParamsForUrl('suppslt-' + strItem);
        else if (sidebarObjKey === 'displayType') handleParamsForUrl('dispt-' + strItem);
        else if (sidebarObjKey === 'displaySize') handleParamsForUrl('disps-' + strItem);
        else if (sidebarObjKey === 'processorType') handleParamsForUrl('proct-' + strItem);
        else if (sidebarObjKey === 'supportedCpus') handleParamsForUrl('proct-' + strItem);
        else if (sidebarObjKey === 'soketList') handleParamsForUrl('soc-' + strItem);
        else if (sidebarObjKey === 'warrantyLists') handleParamsForUrl('warr-' + strItem);
        else if (sidebarObjKey === 'graphicsList') handleParamsForUrl('gpu-' + strItem);
        else if (sidebarObjKey === 'graphicsOutput') handleParamsForUrl('gro-' + strItem);
        else if (sidebarObjKey === 'cameraType') handleParamsForUrl('camt-' + strItem);
        else if (sidebarObjKey === 'batteryType') handleParamsForUrl('btr-' + strItem);
        else if (sidebarObjKey === 'warrantyLists') handleParamsForUrl('warr-' + strItem);
        else handleParamsForUrl(strItem);
        
        if (!multipleObjsOfStateArr) {
            const regex = new RegExp(/brandList\d./, 'i');
            // console.log((indexArr.length > 0 && indexArr.some(elemStr => regex.test(elemStr))) || (indexArr.length === 0 && !indexArr.some(elemStr => regex.test(elemStr))));
            
            if (sidebarObjKey === 'brandList') setChkBrandChecked(true);
            if (sidebarObjKey !== 'brandList' && !indexArr.some(elemStr => regex.test(elemStr))) setChkBrandChecked(false);
        }
    }
    return (
        <li onClick={onClickActions} className='hover:cursor-pointer flex items-center gap-1' key={`processorFilteringByModels${uuidv4()}`}>
            <label>
                <input className='mr-2' type="checkbox" name={`checkbox-${uuidv4()}`} checked={sidebarObjKey === 'brandList' ? indexArr.includes(sidebarObjKey + i + strItem) : indexArr.includes(i + strItem)} readOnly />
                <span>{strItem} {strItemXTN && strItemXTN}</span>
            </label>
        </li>
    )
}

export default LiComponentForAsideCompFiltering;