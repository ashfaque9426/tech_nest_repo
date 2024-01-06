// for adding img urls to the imgUrls state
const addImgUrls = (e, imgUrlsArr) => {
    e.preventDefault();
    if (!imgUrlFieldAdded) return;

    for (let key in imgUrlInputFieldValues) {
        imgUrlsArr.push(imgUrlInputFieldValues[key]);
    }
}

// handle submit function for add a product form backed up.
const handleSubmit = e => {
    e.preventDefault();
    setResponseMsg("");

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
        offer: form.offer.value,
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

    setResponseMsg('Data is processing. Please wait.');

    // passing collected formData to addNewProduct function. this function bellow returns a promise and from there I am extracting the data
    addNewProduct(formData).then(data => {
        // if the formData/Product successfully added to the database then reseting form input fields and showing success message.
        if (data.message.includes('success' || 'Success')) {
            setChildElems0([]);
            setChildElems1([]);
            setChildElems2([]);
            setChildElems3([]);
            setImgUrlFieldAdded(false);
            setSpecsFieldAdded(false);
            setKeyFeaturesFieldAdded(false);
            setProductDescFieldAdded(false);
            setResponseMsg('Data Processing Successfull.');
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
            setTimeout(() => setResponseMsg(""), 5000);
        }
        else {
            // else showing the error message
            setResponseMsg(data.message);
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
            setTimeout(() => setResponseMsg(""), 5000);
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