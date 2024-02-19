import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import UsersQuestionComponentLayout from '../../client/UsersQuestionComponentLayout';

function UsersQuestionsComponent({ usersQuestionsArr }) {
    return (
        <section className='flex flex-col gap-12'>
            {usersQuestionsArr.map(userObj => (
                userObj?.usersQuestions.map(userQuestionObj => (
                    <UsersQuestionComponentLayout key={`questionCompLayoutKey${uuidv4()}`} userQuestionObj={userQuestionObj} userObj={userObj} />
                ))
            ))}
        </section>
    )
}

export default UsersQuestionsComponent;