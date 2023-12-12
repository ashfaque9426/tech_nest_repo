"use client"
import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DashboardCustomFormInput from '../../shared/server/DashboardCustomFormInput';
import AddSpecsSection from '../AddSpecsSection';
import { toCamelCase } from '@/utils';
import AddDescriptionInputFields from '../../server/AddDeccriptionInputFields';
import AddKeyFeaturesInputFields from '../../server/AddKeyFeaturesInputFields';
import DashboardBtn from '../../shared/server/DashboardBtn';
import { toast } from 'react-toastify';
import { addNewProduct } from '@/services/productServices';

function AddAProductForm() {
    // declaring states
    const [childElems0, setChildElems0] = useState([]);
    const [childElems1, setChildElems1] = useState([]);
    const [childElems2, setChildElems2] = useState([]);
    const [childElems3, setChildElems3] = useState([]);
    const [imgUrlInputFieldValues, setImgUrlInputFieldValues] = useState({});
    const [imgUrlFieldAdded, setImgUrlFieldAdded] = useState(false);
    const [specsFieldAdded, setSpecsFieldAdded] = useState(false);
    const [productDescFieldAdded, setProductDescFieldAdded] = useState(false);
    const [keyFeaturesFieldAdded, setKeyFeaturesFieldAdded] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // references of features field parent elements of input fields
    const keyFeaturesRef = useRef(null);
    const productSpecificationsRef = useRef(null);
    const productDescriptionsRef = useRef(null);

    // for adding img urls to the imgUrls state
    const addImgUrls = (e, imgUrlsArr) => {
        e.preventDefault();
        if (!imgUrlFieldAdded) return;

        for (let key in imgUrlInputFieldValues) {
            imgUrlsArr.push(imgUrlInputFieldValues[key]);
        }
    }

    // this is for capturing img url input field value on change event
    const handleIImgUrlnputChange = (name, value) => {
        setImgUrlInputFieldValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    

    // for adding input fields dynamically
    const handleChildInput = e => {
        e.preventDefault();

        // for imgUrl field inputs
        const imgInputKey = uuidv4();
        const imgInputName = `imgUrl${uuidv4()}`
        const newImgUrlInputElem = <DashboardCustomFormInput key={imgInputKey} type='text' name={imgInputName} className="" placeholder='Insert Image url*' onChange={(e) => handleIImgUrlnputChange(e.target.name, e.target.value)} required />
        
        if(e.target.id === 'addFeaturesInput') {
            setChildElems1(prevElem => [...prevElem, <AddKeyFeaturesInputFields key={uuidv4()} />]);
            setKeyFeaturesFieldAdded(true);
        }
        else if(e.target.id === 'addSpecsField') {
            setChildElems2(prevElem => [...prevElem, <AddSpecsSection key={uuidv4()} />]);
            setSpecsFieldAdded(true);
        }
        else if(e.target.id === 'addImgUrlBtn') {
            setChildElems0(prevImgUrlElems => [...prevImgUrlElems, newImgUrlInputElem]);
            setImgUrlFieldAdded(true);
        }
        else {
            setChildElems3(prevElem => [...prevElem, <AddDescriptionInputFields key={uuidv4()} />]);
            setProductDescFieldAdded(true);
        }
        
    }

    // for removing dynamically added input fields
    const removeChildInput = e => {
        e.preventDefault();
        if(e.target.id === 'removeFeaturesInput') {
            setChildElems1(childElems1.slice(0, -1));
        }
        else if(e.target.id === 'removeSpecsInputArea') {
            setChildElems2(childElems2.slice(0, -1));
        }
        else if(e.target.id === 'removeImgUrlBtn') {
            setChildElems0(childElems0.slice(0, -1));
        }
        else {
            setChildElems3(childElems3.slice(0, -1));
        }
    }

    // for adding product specifications
    const handleAddSpecs = (e, specObjArr) => {
        e.preventDefault();

        // looking for specific state to be truthy for getting the input fields value properly. If the state is falsy then there is no input fields or values.
        if (!specsFieldAdded) return;

        let i = 0;
        // console.log(productSpecificationsRef.current.children);
        if (productSpecificationsRef.current) {
            for (const child of productSpecificationsRef.current.children) {
                
                const title = toCamelCase(child.children[0].value);
                // console.log(child.children[0].value, child.children[1].children[0].children[0].value);
                const obj = {};
                obj[title] = {};
                let objKey;
                let objValue;

                // getting the keys for each child elements from the dom as all the elements of dom are objects.
                Object.keys(child.children[1].children).forEach(key => {
                    // iterating through the expected child elements and processing and organising data.
                    for (const secondChild of child.children[1].children[key].children) {
                        if (i % 2 === 0) {
                            
                            objKey = toCamelCase(secondChild.value);
                        }

                        objValue = secondChild.value;

                        i++;
                        obj[title][objKey] = objValue;
                    }
                });

                // console.log(obj);
                specObjArr.push(obj);
            }
        }
    }

    // for adding product descriptions.
    const handleAddDesc = (e, productDescriptionsArr) => {
        e.preventDefault();

        // looking for specific state to be truthy for getting the input fields value properly. If the state is falsy then there is no input fields or values.
        if (!productDescFieldAdded) return;

        let i = 0;

        // checking for specifiq dom reference if it is truthy then proceeding.
        if (productDescriptionsRef.current) {
            Object.keys(productDescriptionsRef.current.children).forEach(key => {
                // console.log(productDescriptionsRef.current.children[key]);
                const obj = {};
                let firstValueTitle;
                let secondValueDescription;

                // iterating through the child elements from the dom as all the elements of dom are objects and so do processing and organising the data.
                for (const secondChild of productDescriptionsRef.current.children[key].children) {
                    if (i % 2 === 0) {
                        firstValueTitle = toCamelCase(secondChild.value);
                    }
                    secondValueDescription = secondChild.value;
                    i++;
                    obj['title'] = firstValueTitle;
                    obj['description'] = secondValueDescription;
                }
                productDescriptionsArr.push(obj);
            });
            
        }
    }

    // for handleing adding key features
    const handleAddKeyFeatures = (e, keyFeatursObj) => {
        e.preventDefault();

        // looking for specific state to be truthy for getting the input fields value properly. If the state is falsy then there is no input fields or values.
        if (!keyFeaturesFieldAdded) return;

        // checking for specifiq dom reference if it is truthy then proceeding.
        if (keyFeaturesRef.current) {
            let i = 0;
            let objKey;
            let objValue;

            // getting the keys for each child elements from the dom as all the elements of dom are objects and so do processing and organising data.
            Object.keys(keyFeaturesRef.current.children).forEach(key => {
                for (const secondChild of keyFeaturesRef.current.children[key].children) {
                    if(i%2 === 0) {
                        objKey = toCamelCase(secondChild.value);
                    }
                    objValue = secondChild.value;
                    i++;
                    keyFeatursObj[objKey] = objValue;
                }
            });
        }
    }

    // for handling submitting action
    const handleSubmit = e => {
        e.preventDefault();

        // declaring arrays and object for getting input fields data. storing data to the arrays or objects not in the states because handleSummit function on onSubmit event by default asychronous. So it doesn't instantly update the states.
        const imgUrlsArr = [];
        const specObjArr = [];
        const productDescriptionsArr = [];
        const keyFeatursObj = {};

        // this function is for addding image urls to the imgUrlsArr(Array) after iterations.
        addImgUrls(e, imgUrlsArr);

        // this function is responsible for organising data in an object format after iterations then pushing data to specObjArr array.
        handleAddSpecs(e, specObjArr);

        // this function do the same thing like above function and push this into productDescriptionsArr(Array) after iterations.
        handleAddDesc(e, productDescriptionsArr);

        // this function bellow is organising the data only as a single object and adding to keyFeatursObj(Object).
        handleAddKeyFeatures(e, keyFeatursObj);
        
        // targeting the form jsx element.
        const form = e.target;

        // collecting form data
        const formData = {
            status: "approved",
            brand: form.brand.value,
            model: form.model.value,
            productTitle: form.productTitle.value,
            productCategory: form.productCategory.value,
            productStatus: form.productStatus.value,
            points: parseInt(form.points.value),
            quantity: parseInt(form.quantity.value),
            userRating: 0,
            questions: [],
            imgUrls: imgUrlsArr,
            keyFeatures: keyFeatursObj,
            regularPrice: parseFloat(parseFloat(form.regularPrice.value).toFixed(2)),
            price: parseFloat(parseFloat(form.price.value).toFixed(2)),
            productSpecifications: specObjArr,
            productDescriptions: productDescriptionsArr

        }

        // console.log(formData);

        // passing collected formData to addNewProduct function. this function bellow returns a promise and from there I am extracting the data
        addNewProduct(formData).then(data => {
            // if the formData/Product successfully added to the database then reseting form input fields and showing success message.
            if(data.message.includes('success'.toLocaleLowerCase() || 'Success')) {
                setChildElems0([]);
                setChildElems1([]);
                setChildElems2([]);
                setChildElems3([]);
                setImgUrlFieldAdded(false);
                setSpecsFieldAdded(false);
                setKeyFeaturesFieldAdded(false);
                setProductDescFieldAdded(false);
                toast.success(data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                form.reset();
            }
            else {
                // else showing the error message
                setErrorMsg(data.message);
                toast.error(data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        })
        .catch(error => {
            // if its a database connection error or any major error showing the error message to UI also to the browser console.
            console.log(error);
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
        
    }

    return (
        <form className='flex flex-col gap-5 p-5' onSubmit={handleSubmit}>
            {/* form for product specifications */}

            {/*basic required input fields */}
            <fieldset className='lg:w-[85%] 2xl:w-2/3 border rounded-lg p-5'>
                <legend className='my-3 text-lg font-semibold'>Add Specification From</legend>
                <section className='flex flex-col gap-2'>
                    <div className='flex flex-wrap gap-2'>
                        <section className='flex flex-col gap-1'>
                            <label htmlFor='brand'>Brand Name*</label>
                            <DashboardCustomFormInput type='text' name='brand' id='brand' className="" placeholder='Brand Name' required />
                        </section>
                        <section className='flex flex-col gap-1'>
                            <label htmlFor="model">Model Name*</label>
                            <DashboardCustomFormInput type='text' name='model' id='model' className="" placeholder='Model' required />
                        </section>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                        <section className='flex flex-col gap-1'>
                            <label htmlFor="productTitle">Product Title*</label>
                            <DashboardCustomFormInput type='text' name='productTitle' id='productTitle' className="" placeholder='Product Title' required />
                        </section>
                        <section className='flex flex-col gap-1'>
                            <label htmlFor="productCategory">Product Category*</label>
                            <DashboardCustomFormInput type='text' name='productCategory' id='productCategory' className="" placeholder='Product Category' required />
                        </section>
                    </div>
                    
                    <div className='flex flex-wrap gap-2'>
                        <section className='flex flex-col gap-1'>
                            <label htmlFor="productStatus">Product Status*</label>
                            <DashboardCustomFormInput type='text' name='productStatus' id='productStatus' className="" placeholder='Product Status' required />
                        </section>
                        <section className='flex flex-col gap-1'>
                            <label htmlFor="points">Points*</label>
                            <DashboardCustomFormInput type='number' name='points' id='points' className="" placeholder='Points' required />
                        </section>
                    </div>
                    
                    <div className='flex flex-wrap gap-2'>
                        <section className='flex flex-col gap-1'>
                            <label htmlFor="quantity">Product Quantity*</label>
                            <DashboardCustomFormInput type='number' name='quantity' id='quantity' className="" placeholder='Product Quantity' required />
                        </section>
                        <section className='flex flex-col gap-1 lg:mr-24'>
                            <label htmlFor="regularPrice">Regular Price*</label>
                            <DashboardCustomFormInput type='text' name='regularPrice' id='regularPrice' className="" placeholder='Regular Price' required />
                        </section>
                        <section className='flex flex-col gap-1'>
                            <label htmlFor="price">Price*</label>
                            <DashboardCustomFormInput type='text' name='price' id='price' className="" placeholder='Product Price' required />
                        </section>
                    </div>
                </section>
            </fieldset>

            {/* input fields jsx elements for img urls fieldset with dynamic input fields */}
            <fieldset className='lg:w-[85%] 2xl:w-2/3 border rounded-lg p-5'>
                <legend className='my-3 text-lg font-semibold'>Product Image Field</legend>
                <div>
                    <section className='flex flex-col gap-3'>
                        <div className='flex flex-wrap gap-2'>
                            {
                                childElems0.length > 0 ? childElems0 : <h2>Please Add img urls Here.</h2>
                            }
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            <DashboardBtn id='addImgUrlBtn' onClick={handleChildInput}>Add Field</DashboardBtn>
                            {
                                childElems0.length > 0 &&
                                <DashboardBtn id='removeImgUrlBtn' onClick={removeChildInput}>Remove Field</DashboardBtn>
                            }
                        </div>
                    </section>
                    <section></section>
                </div>
            </fieldset>

            {/* key features fieldset with dynamically added input fields */}
            <fieldset className='lg:w-[85%] 2xl:w-2/3 border rounded-lg p-5'>
                <legend className='my-3 text-lg font-semibold'>Add Key Features</legend>
                <div className='flex flex-col gap-3'>
                    <section className='flex flex-wrap gap-2' ref={keyFeaturesRef}>
                        {
                            childElems1.length > 0 ? childElems1 : <h2>Please Add Key Features Here.</h2>
                        }
                    </section>
                    <div className='flex flex-wrap gap-2'>
                        <DashboardBtn id='addFeaturesInput' onClick={handleChildInput}>Add Field</DashboardBtn>
                        {
                            childElems1.length > 0 && <DashboardBtn id='removeFeaturesInput' onClick={removeChildInput}>Remove Field</DashboardBtn>
                        }
                    </div>
                </div>
            </fieldset>

            {/* Add Product Specifications fieldset with dynamically added input fields */}
            <fieldset className='lg:w-[85%] 2xl:w-2/3 border rounded-lg p-5'>
                <legend className='my-3 text-lg font-semibold'>Add Product Specifications</legend>
                <div className='flex flex-col gap-3'>
                    <section className='flex flex-wrap gap-2' ref={productSpecificationsRef}>
                        {
                            childElems2.length > 0 ? childElems2 : <h2>Please Add Product&apos;s Specifications here.</h2>
                        }
                    </section>
                    <div className='flex flex-wrap gap-2'>
                        <DashboardBtn id='addSpecsField' onClick={handleChildInput}>Add Field</DashboardBtn>
                        {
                            childElems2.length > 0 && <DashboardBtn id='removeSpecsInputArea' onClick={removeChildInput}>Remove Field</DashboardBtn>
                        }
                    </div>
                </div>
            </fieldset>

            {/* Add Product Descriptions fieldset with dynamically added input fields */}
            <fieldset className='lg:w-[85%] 2xl:w-2/3 border rounded-lg p-5'>
                <legend className='my-3 text-lg font-semibold'>Add Product Descriptions</legend>
                <div className='flex flex-col gap-3' ref={productDescriptionsRef}>
                    {
                        childElems3.length > 0 ? childElems3 : <h2>Please Add Product&apos;s Description here.</h2>
                    }
                </div>
                <div className='flex flex-wrap gap-2 mt-3'>
                    <DashboardBtn id='addDescInput' onClick={handleChildInput}>Add Field</DashboardBtn>
                    {
                        childElems3.length > 0 && <DashboardBtn id='removeDescInput' onClick={removeChildInput}>Remove Field</DashboardBtn>
                    }
                </div>
            </fieldset>

            {/* submit button input field of type submit */}
            <input className='w-full 2xl:w-1/2 bg-black text-white px-3 rounded-md py-2 hover:cursor-pointer' type="submit" value="Submit" />

            {/* error field shows error sg if errorMsg state length is greater than zero */}
            <section>
                {
                    errorMsg.length > 0 && <p className='text-red-600'>{errorMsg}</p>
                }
            </section>
        </form>
    )
}

export default AddAProductForm;