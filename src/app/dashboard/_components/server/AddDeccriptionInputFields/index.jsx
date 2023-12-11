import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import DashboardCustomFormInput from '../../shared/server/DashboardCustomFormInput';

function AddDescriptionInputFields() {
  return (
    <section className='flex flex-wrap gap-2'>
      <DashboardCustomFormInput type='text' name={`ProductDescription${uuidv4()}`} className="" placeholder='Description Title*' required />
      <DashboardCustomFormInput type='text' name={`ProductDescription${uuidv4()}`} className="" placeholder='Description*' required />
    </section>
  )
}

export default AddDescriptionInputFields;