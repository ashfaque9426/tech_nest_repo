"use client"
import React from 'react';

function RegistrationFormComponent() {
    const handleRegistration = e => {
        e.preventDefault();
    }
    return (
        <form onSubmit={handleRegistration}>RegistrationFormComponent</form>
    )
}

export default RegistrationFormComponent;