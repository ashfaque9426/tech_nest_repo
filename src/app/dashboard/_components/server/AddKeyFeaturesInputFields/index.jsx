import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import DashboardCustomFormInput from '../../shared/server/DashboardCustomFormInput';

function AddKeyFeaturesInputFields() {
  return (
      <section className='flex flex-wrap gap-2'>
          <DashboardCustomFormInput type='text' name={`KeyFeatureName${uuidv4()}`} className="" placeholder='Feature Name*' required />
          <DashboardCustomFormInput type='text' name={`keyFeatureDescription${uuidv4()}`} className="" placeholder='Feature Description*' required />
    </section>
  )
}

export default AddKeyFeaturesInputFields;