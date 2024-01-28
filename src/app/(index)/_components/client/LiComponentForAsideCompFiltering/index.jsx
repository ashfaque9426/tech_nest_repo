"use client";
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function LiComponentForAsideCompFiltering({ strItem, strItemXTN, i, handleParamsForUrl, indexArr, setIndexArr }) {
  return (
      <li onClick={() => handleParamsForUrl(strItem)} className='hover:cursor-pointer flex items-center gap-1' key={`processorFilteringByModels${uuidv4()}`}>
          <label onClick={() => setIndexArr(prevIndexs => indexArr.includes(i + strItem) ? indexArr.filter(indexFromArr => indexFromArr !== i + strItem) : [...prevIndexs, i + strItem])}>
              <input className='mr-2' type="checkbox" name={`checkbox-${uuidv4()}`} checked={indexArr.includes(i + strItem)} onChange={() => setIndexArr(prevIndexs => indexArr.includes(i + strItem) ? indexArr.filter(indexFromArr => indexFromArr !== i + strItem) : [...prevIndexs, i + strItem])} />
              <span onClick={() => setIndexArr(prevIndexs => indexArr.includes(i + strItem) ? indexArr.filter(indexFromArr => indexFromArr !== i + strItem) : [...prevIndexs, i + strItem])}>{strItem} {strItemXTN && strItemXTN}</span>
          </label>
      </li>
  )
}

export default LiComponentForAsideCompFiltering