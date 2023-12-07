import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import DashboardCustomFormInput from '../../shared/server/DashboardCustomFormInput';

function AddDescriptionInputFields() {
  return (
    <section className='flex flex-wrap gap-2'>
      <DashboardCustomFormInput type='text' name={`ProductDescription${uuidv4()}`} className="text-blue-500 border border-gray-700" placeholder='Description Title' />
      <DashboardCustomFormInput type='text' name={`ProductDescription${uuidv4()}`} className="text-blue-500 border border-gray-700" placeholder='Description' />
    </section>
  )
}

export default AddDescriptionInputFields;