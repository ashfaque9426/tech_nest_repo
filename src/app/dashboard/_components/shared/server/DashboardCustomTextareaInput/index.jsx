import cn from '@/lib/clsx/cn';
import React from 'react';

const DashboardCustomTextareaInput = ({ className, name, type, placeholder, onChange, id, rows, cols, ...restPros }) => {
    return (
        <textarea type={type} name={name} id={id && id} rows={rows} cols={cols} className={cn("px-2 py-[1.5px] border border-gray-700 rounded-md outline-[#7d7e93]", className)} placeholder={placeholder} onChange={onChange && onChange} {...restPros}></textarea>
    );
};

export default DashboardCustomTextareaInput;