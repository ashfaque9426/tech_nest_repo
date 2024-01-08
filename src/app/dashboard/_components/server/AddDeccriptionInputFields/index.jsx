import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import DashboardCustomFormInput from '../../shared/server/DashboardCustomFormInput';
import DashboardCustomTextareaInput from '../../shared/server/DashboardCustomTextareaInput';

function AddDescriptionInputFields() {
  return (
    <section className='flex flex-col gap-2'>
      <DashboardCustomFormInput type='text' name={`ProductDescription${uuidv4()}`} className="" placeholder='Description Title*' required />
      <DashboardCustomTextareaInput type='text' rows={4} cols={10} name={`ProductDescription${uuidv4()}`} className="" placeholder='Description*' required />
    </section>
  )
}

export default AddDescriptionInputFields;