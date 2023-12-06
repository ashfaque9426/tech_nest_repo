import React from 'react';

const DashboardCustomFormInput = ({ className, name, type, placeholder, onChange, id }) => {
    return (
        <input type={type} name={name} id={id && id} className={`${className}`} placeholder={placeholder} onChange={onChange && onChange} />
    );
};

export default DashboardCustomFormInput;