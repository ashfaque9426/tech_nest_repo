"use client"
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function UsersQuestionComponentLayout({ userObj, userQuestionObj }) {
    const [questionHeight, setQuestionHeight] = useState(0);
    const [answerHeight, setAnswerHeight] = useState(0);
    const infoHeading = useRef(null)
    const questionRef = useRef(null);
    const ansRef = useRef(null);

    useEffect(() => {
        if (infoHeading.current && questionRef.current) {
            setQuestionHeight(`calc(${infoHeading.current.clientHeight + (questionRef.current.clientHeight / 2) - 3}px)`);
            setAnswerHeight(`calc(${ansRef.current && ansRef.current.clientHeight}px + 24px)`);
            console.log(questionRef.current.clientHeight / 2)
        }
    }, [questionRef, ansRef]);

  return (
      <div className='relative w-auto md:w-2/3 mx-auto flex flex-col gap-6 md:border md:border-black md:dark:border-white md:rounded-xl md:p-7' key={uuidv4()}>
          <h3 ref={infoHeading} className='relative z-10 bg-white dark:bg-[#3a3b3c] text-xl font-semibold border border-black dark:border-white rounded-lg p-3 flex flex-col md:flex-row shadow-lg dark:shadow-none'><span className='break-all lg:break-normal'>Name: {userObj.userName}</span> <span className='md:ms-2 2xl:ms-5 break-all lg:break-normal'>Email: {userObj.userEmail}</span></h3>

          {/* border for showing links between boxes */}
          <div style={{ height: questionHeight }} className='absolute left-[-15px] md:left-3 z-0 border border-black dark:border-white border-r-0 rounded-lg top-14 w-1/2'></div>
          {/* question from user */}
          <p ref={questionRef} className='relative z-10 bg-white dark:bg-[#3a3b3c] text-lg md:ms-8 border border-black dark:border-white rounded-lg p-3 shadow-lg dark:shadow-none'><span className='text-xl font-semibold'>Question:</span> {userQuestionObj.question}</p>

          {/* answer from admin or other user if available */}
          {
              userQuestionObj.ansswer.length > 0 && <>
                  <div style={{ top: `calc(${questionRef.current && questionRef.current.clientHeight}px + 77px)`, height: answerHeight }} className='absolute left-[-15px] md:left-3 z-0 border border-black dark:border-white border-r-0 rounded-lg w-1/2'></div>
                  <p ref={ansRef} className='relative z-10 bg-white dark:bg-[#3a3b3c] text-lg md:ms-14 border border-black dark:border-white rounded-lg p-3 shadow-lg dark:shadow-none'><span className='font-semibold'>Ans:</span> {userQuestionObj.ansswer}</p>
              </>
          }
      </div>
  )
}

export default UsersQuestionComponentLayout;