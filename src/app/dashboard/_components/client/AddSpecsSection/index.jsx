'useClient'
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DashboardCustomFormInput from '../../shared/server/DashboardCustomFormInput';
import DashboardBtn from '../../shared/server/DashboardBtn';

function AddSpecsSection() {
    const [productSpecsInputFields, setProductSpecsInputFields] = useState([]);
    // for adding specification input fields
    const addSpecInputs = e => {
        e.preventDefault();
        const inputFieldContainerKey = uuidv4();

        const newInputFieldsContainer = <div className='flex flex-wrap gap-2' key={inputFieldContainerKey}>
            <DashboardCustomFormInput type='text' name={`Specification${uuidv4()}`} className="" placeholder='Spcification Type*' required />
            <DashboardCustomFormInput type='text' name={`Specification${uuidv4()}`} className="" placeholder='Specification Detail*' required />
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
          <DashboardCustomFormInput type='text' name={`SpecTitle${uuidv4()}`} className="" placeholder='Insert Specification Title*' required />
          <section className='flex flex-wrap gap-2'>
              {
                  productSpecsInputFields.length > 0 ? productSpecsInputFields : <h2>Please Add Product Specification fields here.</h2>
              }
          </section>
          <div className='flex flex-wrap gap-2'>
              <DashboardBtn id='addSpecsInputs' onClick={addSpecInputs}>Add Specification Fields</DashboardBtn>
              {
                  productSpecsInputFields.length > 0 && <DashboardBtn id='removeSpecInput' onClick={removeInputField}>Remove Specification Fields</DashboardBtn>
              }
          </div>
      </div>
  )
}

export default AddSpecsSection;