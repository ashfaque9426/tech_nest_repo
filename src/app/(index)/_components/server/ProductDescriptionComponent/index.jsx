import { fromCamelCase } from '@/utils';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function ProductDescriptionComponent({productDescriptionArr}) {
  return (
    <div className='flex flex-col gap-8'>
        {
              productDescriptionArr.map(descriptionObj => <ul className='flex flex-col gap-2' key={`descParentUL${uuidv4()}`}>
                {
                    Object.keys(descriptionObj).map(key => <li key={`descListItem${uuidv4()}`}>
                        <span className='text-xl font-semibold capitalize'>{fromCamelCase(key)}:</span> <span className={`${key === 'title' && 'font-semibold text-lg capitalize'}`}>{descriptionObj[key]}</span>
                    </li>)
                }
            </ul>
            )
        }
    </div>
  )
}

export default ProductDescriptionComponent;