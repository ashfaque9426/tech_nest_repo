"use client"
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function UsersQuestionsComponent({usersQuestionsArr}) {
  return (
      <section className='flex flex-col gap-12'>
          {usersQuestionsArr.map(userObj => (
              userObj?.usersQuestions.map(userQuestionObj => (
                  <div className='relative w-auto md:w-2/3 mx-auto flex flex-col gap-6 md:border md:border-black md:dark:border-white md:rounded-xl md:p-7' key={uuidv4()}>
                      <h3 className='bg-white dark:bg-[#3a3b3c] text-xl font-semibold border border-black dark:border-white rounded-lg p-3 flex flex-col md:flex-row'><span>Name: {userObj.userName}</span> <span className='md:ms-5 break-all'>Email: {userObj.userEmail}</span></h3>
                      <div className='hidden md:block absolute left-3 z-[-1] border border-black dark:border-white border-r-0 rounded-lg top-14 h-20 w-1/2'></div>
                      <p className='bg-white dark:bg-[#3a3b3c] text-lg md:ms-8 border border-black dark:border-white rounded-lg p-3 break-all'><span className='text-xl font-semibold'>Question:</span> {userQuestionObj.question}</p>
                      {
                          userQuestionObj.ansswer.length > 0 && <>
                              <div className='hidden md:block absolute left-3 z-[-1] border border-black dark:border-white border-r-0 rounded-lg top-[135px] h-20 w-1/2'></div>
                              <p className='bg-white dark:bg-[#3a3b3c] text-lg md:ms-14 border border-black dark:border-white rounded-lg p-3 break-all'>{userQuestionObj.ansswer}</p>
                          </>
                      }
                  </div>
              ))
          ))}
      </section>
  )
}

export default UsersQuestionsComponent;