import React from 'react';

const DashboardCustomFormInput = ({ className, name, type, placeholder, onChange }) => {
    return (
        <input type={type} name={name} className={`${className}`} placeholder={placeholder} onChange={onChange && onChange} required />
    );
};

export default DashboardCustomFormInput;