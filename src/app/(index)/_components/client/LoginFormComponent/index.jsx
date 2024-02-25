"use client"
import React, { useState } from 'react';
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";

function LoginFormComponent() {
    // for changing password visibility.
    const [passVisibility, setPassVisibility] = useState(false);

    // for handling login actions.
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email;
        const password = form.password;
    }

    return (
        <form onSubmit={handleLogin}>
            <div className="min-h-screen md:min-h-[calc(100vh-30vh)] bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold dark:text-black">Provide Your Email And Password to Login</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                        <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                    </div>
                                    <div className="relative">
                                        <span onClick={() => setPassVisibility(!passVisibility)} className={`${passVisibility ? 'hidden' : 'block'} absolute right-3 top-[0.65rem] text-2xl cursor-pointer`}><MdOutlineVisibility /></span>
                                        <span onClick={() => setPassVisibility(!passVisibility)} className={`${passVisibility ? 'block' : 'hidden'} absolute right-3 top-[0.65rem] text-2xl cursor-pointer`}><MdOutlineVisibilityOff /></span>
                                        <input autoComplete="off" id="password" name="password" type={passVisibility ? "text" : "password"} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    <div className="relative">
                                        <input className="cursor-pointer bg-[#3498db] text-white rounded-md px-2 py-1" type="submit" value="Login" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default LoginFormComponent;