import React from 'react';
import { MdOutlineAppRegistration } from "react-icons/md";
import RegistrationFormComponent from '../_components/client/RegistrationFormComponent';
import Link from 'next/link';

function Registration() {
  return (
    <section role='main' className='dark:text-black min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8' aria-labelledby='subMainContentLabel'>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <span className='text-3xl flex justify-center'><MdOutlineAppRegistration /></span>
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
          <span className='mr-1'>Or</span>
          <Link href="/login"
            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
            login to your account
          </Link>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10 shadow-md">
          <RegistrationFormComponent />
        </div>
      </div>
    </section>
  )
}

export default Registration;