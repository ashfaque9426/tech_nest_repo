import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import DashboardCustomFormInput from '../../shared/server/DashboardCustomFormInput';

function AddKeyFeaturesInputFields() {
  return (
      <section className='flex flex-wrap gap-2'>
          <DashboardCustomFormInput type='text' name={`KeyFeatureName${uuidv4()}`} className="text-blue-500 border border-gray-700" placeholder='Feature Name' />
          <DashboardCustomFormInput type='text' name={`keyFeatureDescription${uuidv4()}`} className="text-blue-500 border border-gray-700" placeholder='Feature Description' />
    </section>
  )
}

export default AddKeyFeaturesInputFields;