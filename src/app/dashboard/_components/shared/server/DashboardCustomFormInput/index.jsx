import cn from '@/lib/clsx/cn';
import React from 'react';

const DashboardCustomFormInput = ({ className, name, type, placeholder, onChange, id, ...restPros }) => {
    return (
        <input type={type} name={name} id={id && id} className={cn("px-2 py-[1.5px] border border-gray-700 rounded-md outline-[#7d7e93]", className)} placeholder={placeholder} onChange={onChange && onChange} {...restPros} />
    );
};

export default DashboardCustomFormInput;