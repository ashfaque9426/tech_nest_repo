import { fromCamelCase } from '@/utils';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function ProductDescriptionComponent({productDescriptionArr}) {
  return (
    <div className='flex flex-col gap-8'>
        {
              productDescriptionArr.map(descriptionObj => <div className='flex flex-col gap-2' key={`descParentUL${uuidv4()}`}>
                {
                  Object.keys(descriptionObj).map(key => key === 'title' ? <h3 className='text-xl font-semibold capitalize' key={`descListItem${uuidv4()}`}><span>{fromCamelCase(key)}:</span> <span className='leading-10 md:leading-5'>{descriptionObj[key]}</span></h3> : <p className='text-justify break-words leading-10 md:leading-8' key={`descListItem${uuidv4()}`}><span className='text-xl font-semibold capitalize'>{fromCamelCase(key)}:</span> <span className="text-lg">{descriptionObj[key]}</span></p>)
                }
            </div>
            )
        }
    </div>
  )
}

export default ProductDescriptionComponent;