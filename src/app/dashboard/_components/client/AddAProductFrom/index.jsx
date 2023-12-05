"use client"
import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DashboardCustomFormInput from '../../shared/server/DashboardCustomFormInput';

function AddAProductForm() {
    // declaring states
    const [imgUrls, setImgUrls] = useState([]);
    const [childElems0, setChildElems0] = useState([]);
    const [childElems1, setChildElems1] = useState([]);
    const [childElems2, setChildElems2] = useState([]);
    const [childElems3, setChildElems3] = useState([]);
    const [imgUrlInputFieldValues, setImgUrlInputFieldValues] = useState({});

    // this is for capturing img url input field value on change event
    const handleInputChange = (name, value) => {
        setImgUrlInputFieldValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    // for adding img urls to the imgUrls state
    const addImgUrls = e => {
        e.preventDefault();
        for (let key in imgUrlInputFieldValues) {
            setImgUrls(prevImgUrlElems => [...prevImgUrlElems, imgUrlInputFieldValues[key]]);
        }
    }

    // for adding input fields dynamically
    const handleChildInput = e => {
        e.preventDefault();

        const imgInputKey = uuidv4();
        const imgInputName = `imgUrl${uuidv4()}`
        const newImgUrlInputElem = <DashboardCustomFormInput key={imgInputKey} type='text' name={imgInputName} className='text-blue-500' placeholder='Insert Image url' onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
        
        if(e.target.id === 'addFeaturesInput') {
            setChildElems1(prevElem => [...prevElem]);
        }
        else if(e.target.id === 'addSpecsInput') {
            console.log('inside add Specs');
        }
        else if(e.target.id === 'addImgUrlBtn') {
            setChildElems0(prevImgUrlElems => [...prevImgUrlElems, newImgUrlInputElem]);
        }
        else {
            console.log('inside other one');
        }
        
    }

    // for removing dynamically added input fields
    const removeChildInput = e => {
        e.preventDefault();
        if(e.target.id === 'removeFeaturesInput') {
            setChildElems1(childElems1.slice(0, -1));
        }
        else if(e.target.id === 'removeSpecsInput') {
            setChildElems2(childElems2.slice(0, -1));
        }
        else if(e.target.id === 'removeImgUrlBtn') {
            setChildElems0(childElems0.slice(0, -1));
        }
        else {
            setChildElems3(childElems3.slice(0, -1));
        }
    }

    // for handling submitting action
    const handleSubmit = e => {
        e.preventDefault();

        const form = e.target;

        const formData = {
            status: "approved",
            brand: form.brand.value,
            productTitle: form.productTitle.value,
            productCategory: form.productCategory.value,
            productStatus: form.productStatus.value,
            points: parseInt(form.points.value),
            quantity: form.quantity.value,
            userRating: 0,
            questions: [],
            imgUrls: imgUrls,
            regularPrice: parseFloat(parseFloat(form.regularPrice.value).toFixed(2)),
            price: parseFloat(parseFloat(form.price.value).toFixed(2))

        }

        console.log(formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Add Specification From</legend>
                <section>
                    <DashboardCustomFormInput type='text' name='brand' className="text-blue-500" placeholder='Brand Name' />
                    <DashboardCustomFormInput type='text' name='model' className="text-blue-500" placeholder='Model' />
                    <DashboardCustomFormInput type='text' name='productTitle' className="text-blue-500" placeholder='Product Title' />
                    <DashboardCustomFormInput type='text' name='productCategory' className="text-blue-500" placeholder='Product Category' />
                    <DashboardCustomFormInput type='text' name='productStatus' className="text-blue-500" placeholder='Product Status' />
                    <DashboardCustomFormInput type='number' name='points' className="text-blue-500" placeholder='Points' />
                    <DashboardCustomFormInput type='number' name='quantity' className="text-blue-500" placeholder='Product Quantity' />
                    <DashboardCustomFormInput type='text' name='regularPrice' className="text-blue-500" placeholder='Regular Price' />
                    <DashboardCustomFormInput type='text' name='price' className="text-blue-500" placeholder='Product Price' />
                </section>
            </fieldset>
            <fieldset>
                <div>
                    {
                        childElems0.length > 0 ? childElems0 : <h2>Please Add img urls Here.</h2>
                    }
                </div>
                <button id='addImgUrlBtn' onClick={handleChildInput}>Add Field</button>
                <button id='removeImgUrlBtn' onClick={removeChildInput}>Remove Field</button>
                <button onClick={addImgUrls}>Add Img Urls</button>
            </fieldset>
            <fieldset>
                <div>
                    {
                        childElems1.length > 0 ? childElems1 : <h2>Please Add Key Features Here.</h2>
                    }
                </div>
                <button id='addFeaturesInput' onClick={handleChildInput}>Add Field</button>
                <button id='removeFeaturesInput' onClick={removeChildInput}>Remove Field</button>
            </fieldset>
            <fieldset>
                <div>
                    {
                        childElems2.length > 0 ? childElems2 : <h2>Please Add Product&apos;s Specifications here.</h2>
                    }
                </div>
                <button id='addSpecsInput' onClick={handleChildInput}>Add Field</button>
                <button id='removeSpecsInput' onClick={removeChildInput}>Remove Field</button>
            </fieldset>
            <fieldset>
                <div>
                    {
                        childElems3.length > 0 ? childElems3 : <h2>Please Add Product&apos;s Description here.</h2>
                    }
                </div>
                <button id='addDescInput' onClick={handleChildInput}>Add Field</button>
                <button id='removeDescInput' onClick={removeChildInput}>Remove Field</button>
            </fieldset>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default AddAProductForm;