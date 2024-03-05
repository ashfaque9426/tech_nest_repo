'use client';
import React, { useState } from 'react';
import DashboardTableCompOne from '../../_components/shared/server/DashboardTableCompOne';
import { RiAdminFill, RiDeleteBin2Fill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";

function Page() {
    const [users, setUsers] = useState([
        {
            name: "Sumon",
            email: "sumonahmed9416@gmail.com",
            role: "admin",
            imgUrl: "https://i.ibb.co/6PwR13Q/devid.jpg"
        },
        {
            name: "Jessica",
            email: "jessica@example.com",
            role: "dealer",
            imgUrl: "https://i.ibb.co/NtZRkcw/admin1.jpg"
        },
        {
            name: "Alex",
            email: "alex@example.com",
            role: "user",
            imgUrl: "https://i.ibb.co/HTcYxJs/stuImg1.jpg"
        },
        {
            name: "Emily",
            email: "emily@example.com",
            role: "dealer",
            imgUrl: "https://i.ibb.co/fCR0QPN/course-Image11.jpg"
        },
        {
            name: "David",
            email: "david@example.com",
            role: "user",
            imgUrl: "https://i.ibb.co/nf5X3cn/Photographer-editing-photos.jpg"
        },
        {
            name: "Sophie",
            email: "sophie@example.com",
            role: "dealer",
            imgUrl: "https://i.ibb.co/1bm4R54/emilly.jpg"
        },
        {
            name: "Chris",
            email: "chris@example.com",
            role: "user",
            imgUrl: "https://i.ibb.co/B4nDpS9/student1.webp"
        },
        {
            name: "Olivia",
            email: "olivia@example.com",
            role: "dealer",
            imgUrl: "https://i.ibb.co/Bz75X7x/course-Image12.webp"
        },
        {
            name: "Daniel",
            email: "daniel@example.com",
            role: "user",
            imgUrl: "https://i.ibb.co/5vMMYnh/chef2.jpg"
        },
        {
            name: "Mia",
            email: "mia@example.com",
            role: "dealer",
            imgUrl: "https://i.ibb.co/SwxM8Q9/wilson.webp"
        }
    ]);

    const handleMakeAdmin = () => {
        console.log('User is admin now');
    }

    const handleMakeDealer = () => {
        console.log('User is a dealer now');
    }

    const handleDeleteUser = () => {
        console.log('user has been deleted');
    }

    return (
        <main className='border w-full lg:w-2/3 md:p-5' role="main" aria-labelledby="subMainContentLabel">
            
            {/* dynamic table component for different types of user data. */}
            {
                users.length > 0 && <DashboardTableCompOne tableHeadingDataArr={['image', 'name', 'email', 'role', 'make admin', 'make dealer', 'delete']} tableDataArr={users} btnFuncOne={handleMakeAdmin} btnFuncTwo={handleMakeDealer} btnThreeFunc={handleDeleteUser} imgKeyStr='imgUrl' btnOne={true} btnTwo={true} delBtn={true} classNameForBtnOne='text-2xl bg-blue-500 disabled:opacity-50 hover:bg-blue-700 disabled:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded' classNameForBtnTwo='text-2xl bg-[#f4745c] disabled:opacity-50 hover:bg-red-700 disabled:hover:bg-[#f4745c] text-white font-bold py-2 px-4 rounded capitalize' classNameForBtnThree='text-4xl text-center text-red-400 hover:text-red-500 cursor-pointer' btnOneIcon={<RiAdminFill />} btnTwoIcon={<FaHandshake />} btnThreeIcon={<RiDeleteBin2Fill />} />
            }

        </main>
    )
}

export default Page