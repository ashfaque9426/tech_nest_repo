"use client"
import React, { useState } from 'react'
import DashboardCustomFormInput from '../../shared/server/DashboardCustomFormInput';
import addBannerData from '@/services/bannerServices';
import { toast } from 'react-toastify';

function AddBannerDataForm({ apiKey }) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const bannerTitle = form.bannerTitle.value;
        const bannerSubtitle = form.bannerSubtitle.value;
        const bgImgUrl = form.bgImgUrl.value;
        const productImgUrl = form.productImgUrl.value || "";
        let uploadedImgUrl = "";
        let uploadedImgUrl2 = "";
        let formDataObj = {};

        // console.log(bannerTitle, bannerSubtitle, bgImgUrl, productImgUrl, apiKey);

        const formData = new FormData();
        formData.append('image', bgImgUrl);

        // console.log(formData);
        const imgbbUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;


        await fetch(imgbbUrl, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(async imgbbData => {
                uploadedImgUrl = imgbbData.data.display_url;
                if (productImgUrl.length > 0) {
                    const formData2 = new FormData();
                    formData2.append('image', productImgUrl);
                    await fetch(imgbbUrl, { method: "POST", body: formData2 })
                        .then(res => res.json())
                        .then(imgbbData2 => {
                            uploadedImgUrl2 = imgbbData2.data.display_url;
                        })
                        .catch(err => console.log(err.message));
                }
            })
            .catch(err => console.log(err));

        if (uploadedImgUrl.length > 0 && uploadedImgUrl2.length > 0) {
            formDataObj['bannerTitle'] = bannerTitle;
            formDataObj['bannerSubtitle'] = bannerSubtitle;
            formDataObj['bgImgUrl'] = uploadedImgUrl;
            formDataObj['productImgUrl'] = uploadedImgUrl2;
        }

        if (uploadedImgUrl.length > 0 && uploadedImgUrl2.length === 0) {
            formDataObj['bannerTitle'] = bannerTitle;
            formDataObj['bannerSubtitle'] = bannerSubtitle;
            formDataObj['bgImgUrl'] = uploadedImgUrl;
            formDataObj['productImgUrl'] = productImgUrl;
        }

        if (Object.keys(formDataObj).length > 0) {
            addBannerData(formDataObj).then(data => {
                if(data.success) {
                    form.reset();
                    setLoading(false);
                    return toast.success(data.message, {
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

                setLoading(false);
                return toast.error(data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }).catch(err => console.log(err));
        }

    }

    return (
        <form className='m-5' onSubmit={handleSubmit}>
            <fieldset className='border rounded-lg p-5 pb-12'>
                <legend className='my-3 text-lg font-semibold'>Banner Information From</legend>
                <div className='flex flex-col gap-5 p-5'>
                    <section className='flex flex-col gap-1'>
                        <label htmlFor='bannerTitle'>Banner Title*</label>
                        <DashboardCustomFormInput type='text' name='bannerTitle' id='bannerTitle' className="" placeholder='Banner Title' required />
                    </section>

                    <section className='flex flex-col gap-1'>
                        <label htmlFor='bannerSubtitle'>Banner Subtitle*</label>
                        <DashboardCustomFormInput type='text' name='bannerSubtitle' id='bannerSubtitle' className="" placeholder='Banner Sub Title' required />
                    </section>

                    <section className='flex flex-col gap-1'>
                        <label htmlFor='bgImgUrl'>Background Image Url*</label>
                        <DashboardCustomFormInput type='text' name='bgImgUrl' id='bgImgUrl' className="" placeholder='Background Image Url' required />
                    </section>

                    <section className='flex flex-col gap-1'>
                        <label htmlFor='productImgUrl'>Product Image Url</label>
                        <DashboardCustomFormInput type='text' name='productImgUrl' id='productImgUrl' className="" placeholder='Product Image Url' />
                    </section>
                </div>

                {/* submit button input field of type submit */}
                <input className='w-full bg-black mt-5 text-white px-3 rounded-md py-2 hover:cursor-pointer' type="submit" value={loading ? 'Please Wait' : 'Submit'} />
            </fieldset>
        </form>
    )
}

export default AddBannerDataForm;