"use client"
import React, { useState } from 'react';
import { addQuestionForProduct } from '@/services/productServices';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import BtnComponentOne from '../../server/BtnComponentOne';
import UsersQuestionsComponent from '../../server/UsersQuestionsComponent';

function ProductQestionSectionComponent({ id, serverResMsg, productData }) {
    const [viewQuestionFrom, setViewQuestionForm] = useState(false);
    const [questionsArr, setQuestionsArr] = useState([]);

    const handleQuestionSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const userName = form.userName.value;
        const userEmail = form.userEmail.value;
        const usersQuestion = form.usersQuestion.value;

        const questionObj = {
            qid: `questionID${uuidv4()}`,
            userName: userName.length > 0 ? userName : 'Unknown User',
            userEmail: userEmail,
            usersQuestions: [{ question: usersQuestion, ansswer: '' }]
        }

        await addQuestionForProduct(id, questionObj, userEmail).then(data => {
            if (data.success) {
                // refetching the data again on successfull question added to the server.
                setQuestionsArr(data.updatedDataArr);

                toast(data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast(data.message, {
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
        }).catch(err => console.log(err.message));

        // console.log(questionObj);
        // resetting form data
        form.reset();
        setViewQuestionForm(false);
    }

    return (
        <section className='mt-24 mx-5 2xl:mx-0' role="region" aria-labelledby="section4Label">
            {
                !serverResMsg && (productData?.questions.length > 0 || questionsArr.length > 0) && <div>
                    <h2 id='section4LabelHeading' className='font-semibold text-[22px] md:text-2xl mb-8 md:text-center'>Questions related to {productData?.productTitle}.</h2>

                    <UsersQuestionsComponent usersQuestionsArr={questionsArr.length > 0 ? questionsArr : productData.questions} />
                </div>
            }


            <div className='mt-12'>
                <form className={viewQuestionFrom ? 'block w-auto md:w-2/3 md:mx-auto' : 'hidden'} onSubmit={handleQuestionSubmit}>
                    <fieldset className='border border-black dark:border-white shadow-lg dark:shadow-none rounded-md p-5 flex flex-col gap-3'>
                        <legend className='font-bold'>User Question From</legend>
                        <section className='flex flex-col gap-1'>
                            <label className='font-semibold' htmlFor="userName">Provide User Name</label>
                            <input className='border border-black dark:text-black dark:border-white px-3 py-1 rounded-md' type="text" name="userName" id="userName" placeholder="Your Name(Optional)" autoComplete="username" />
                        </section>

                        <section className='flex flex-col gap-1'>
                            <label className='font-semibold' htmlFor="userEmail">Your Email*</label>
                            <input className='border border-black dark:text-black dark:border-white px-3 py-1 rounded-md' type="email" name="userEmail" id="userEmail" placeholder="Your Email" required autoComplete="email" />
                        </section>

                        <section className='flex flex-col gap-1'>
                            <label className='font-semibold' htmlFor="usersQuestion">Your Question*</label>
                            <textarea className='border border-black dark:text-black dark:border-white px-3 py-1 rounded-md' name="usersQuestion" id="usersQuestion" cols="10" rows="5" placeholder="Provide Your Question" required ></textarea>
                        </section>
                    </fieldset>

                    <input className='px-3 py-1 text-white bg-[#585657] rounded-lg my-3' type="submit" value="Submit" />
                </form>
                <div className={!viewQuestionFrom ? 'flex justify-center' : 'hidden'}>
                    <BtnComponentOne onClickFunc={() => setViewQuestionForm(true)}>Add a Question?</BtnComponentOne>
                </div>
            </div>
        </section>
    )
}

export default ProductQestionSectionComponent;