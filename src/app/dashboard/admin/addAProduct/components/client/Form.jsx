"use client"
import React from 'react';

function Form() {
    const handleSubmit = async e => {
        e.preventDefault();
        console.log("inside handle submit");
    }
    return (
        <form onSubmit={handleSubmit}>
            <section></section>
            <section></section>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default Form;