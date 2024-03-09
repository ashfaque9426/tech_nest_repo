"use client"
import userRegistration from '@/services/userRegistration';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function RegistrationFormComponent() {
    const [emailErr, setEmailErr] = useState("");
    const [passErr, setPassErr] = useState("");
    const [userCreationErr, setUserCreationErr] = useState('');

    const handleRegistration = async e => {
        e.preventDefault();
        setEmailErr("");
        setPassErr("");
        setUserCreationErr('');
        
        const form = e.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const passoword = form.password.value;
        const confirmPassword = form.password_confirmation.value;
        const imgUrl = form.imgUrl.value;
        const address = form.address.value;

        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            imgUrl: imgUrl || '',
            role: 'user',
            address: address || ''
        }

        if(passoword !== confirmPassword) return setPassErr("Passwords Do Not Match.");

        try {
            const result = await userRegistration(userData);
            if(result.success) {
                toast.success(result.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            } else {
                setUserCreationErr(result.message);
            }
        } catch (err) {
            console.log(err);
        }


    }

    return (
        <form onSubmit={handleRegistration}>
            <div>
                <label htmlFor="firstName" className="block text-sm font-medium leading-5  text-gray-700">First Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input id="firstName" name="firstName" placeholder="ex.Ashfaq" type="text" required={true} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
            </div>

            <div className="mt-6">
                <label htmlFor="lastName" className="block text-sm font-medium leading-5 text-gray-700">LastName</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                    <input id="lastName" name="lastName" placeholder="ex.Rahman" type="text" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
            </div>

            <div className="mt-6">
                <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">
                    Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input id="email" name="email" placeholder="user@example.com" type="email" required={true} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5
                " />
                    <div className={`${emailErr.length > 0 ? "flex" : "hidden"} absolute inset-y-0 right-0 pr-3 items-center pointer-events-none`}>
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </div>
                </div>
            </div>

            <div className="mt-6">
                <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                    Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input id="password" name="password" type="password" required={true} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    <div className={`${passErr.length > 0 ? "flex" : "hidden"} absolute inset-y-0 right-0 pr-3 items-center pointer-events-none`}>
                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <label htmlFor="password_confirmation" className="block text-sm font-medium leading-5 text-gray-700">
                    Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input id="password_confirmation" name="password_confirmation" type="password" required={true} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    <div className={`${passErr.length > 0 ? "flex" : "hidden"} absolute inset-y-0 right-0 pr-3 items-center pointer-events-none`}>
                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <label htmlFor="imgUrl" className="block text-sm font-medium leading-5 text-gray-700">
                    Image Url
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input id="imgUrl" name="imgUrl" type="text" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
            </div>

            <div className="mt-6">
                <label htmlFor="address" className="block text-sm font-medium leading-5 text-gray-700">
                    Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input id="address" name="address" type="text" required={true} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
            </div>

            <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                    <input type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3498db] hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out cursor-pointer" value="Create account" />
                </span>
            </div>
        </form>
    )
}

export default RegistrationFormComponent;