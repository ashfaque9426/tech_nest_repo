'useClient'
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DashboardCustomFormInput from '../../shared/server/DashboardCustomFormInput';

function AddSpecsSection() {
    const [productSpecsInputFields, setProductSpecsInputFields] = useState([]);
    // for adding specification input fields
    const addSpecInputs = e => {
        e.preventDefault();
        const inputFieldContainerKey = uuidv4();

        const newInputFieldsContainer = <div className='flex flex-wrap gap-2' key={inputFieldContainerKey}>
            <DashboardCustomFormInput type='text' name={`Specification${uuidv4()}`} className="text-blue-500 border border-gray-700" placeholder='Spcification Type' />
            <DashboardCustomFormInput type='text' name={`Specification${uuidv4()}`} className="text-blue-500 border border-gray-700" placeholder='Specification' />
        </div>
        if (e.target.id === 'addSpecsInputs') {
            setProductSpecsInputFields(prevFields => [...prevFields, newInputFieldsContainer]);
        }
        // console.log(productSpecsInputFields);
    }

    // for removing specification input fields
    const removeInputField = e => {
        e.preventDefault();
        if(e.target.id === 'removeSpecInput') {
            setProductSpecsInputFields(productSpecsInputFields.slice(0, -1));
        }
    }

  return (
      <div className='flex flex-col gap-3'>
          <DashboardCustomFormInput type='text' name={`SpecTitle${uuidv4()}`} className="text-blue-500 border border-gray-700" placeholder='Insert Specification Title' />
          <section>
              {
                  productSpecsInputFields.length > 0 ? productSpecsInputFields : <h2>Please Add Product Specification fields here.</h2>
              }
          </section>
          <div className='flex flex-wrap gap-2'>
              <button className='border border-red-500 px-3' id='addSpecsInputs' onClick={addSpecInputs}>Add Specification Fields</button>
              <button className='border border-red-500 px-3' id='removeSpecInput' onClick={removeInputField}>Remove Specification Fields</button>
          </div>
      </div>
  )
}

export default AddSpecsSection;