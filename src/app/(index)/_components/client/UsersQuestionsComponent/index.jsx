"use client"
import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

function UsersQuestionsComponent({ usersQuestionsArr }) {
    const questionRef = useRef(null);
    const ansRef = useRef(null);

    return (
        <section className='flex flex-col gap-12'>
            {usersQuestionsArr.map(userObj => (
                userObj?.usersQuestions.map(userQuestionObj => (
                    <div className='relative w-auto md:w-2/3 mx-auto flex flex-col gap-6 md:border md:border-black md:dark:border-white md:rounded-xl md:p-7' key={uuidv4()}>
                        <h3 className='bg-white dark:bg-[#3a3b3c] text-xl font-semibold border border-black dark:border-white rounded-lg p-3 flex flex-col md:flex-row shadow-lg dark:shadow-none'><span>Name: {userObj.userName}</span> <span className='md:ms-5 break-all'>Email: {userObj.userEmail}</span></h3>
                        <div style={{ height: `calc(${questionRef.current && questionRef.current.clientHeight}px + 20px)` }} className='absolute left-[-15px] md:left-3 z-[-1] border border-black dark:border-white border-r-0 rounded-lg top-14 w-1/2'></div>
                        <p ref={questionRef} className='bg-white dark:bg-[#3a3b3c] text-lg md:ms-8 border border-black dark:border-white rounded-lg p-3 shadow-lg dark:shadow-none'><span className='text-xl font-semibold'>Question:</span> {userQuestionObj.question}</p>
                        {
                            userQuestionObj.ansswer.length > 0 && <>
                                <div style={{ top: `calc(${questionRef.current && questionRef.current.clientHeight}px + 75px)`, height: `calc(${ansRef.current && ansRef.current.clientHeight}px + 25px)` }} className='absolute left-[-15px] md:left-3 z-[-1] border border-black dark:border-white border-r-0 rounded-lg w-1/2'></div>
                                <p ref={ansRef} className='bg-white dark:bg-[#3a3b3c] text-lg md:ms-14 border border-black dark:border-white rounded-lg p-3 shadow-lg dark:shadow-none'>{userQuestionObj.ansswer}</p>
                            </>
                        }
                    </div>
                ))
            ))}
        </section>
    )
}

export default UsersQuestionsComponent;