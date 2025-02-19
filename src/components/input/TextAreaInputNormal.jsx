"use client";

import React from 'react';
import TextArea from "antd/es/input/TextArea";

const TextInputNormal = ({ label, ...props }) => {

    return (
        <div className='mb-[12px] w-full'>
            {label && <label htmlFor={props.id || props.name} className='text-[14px] font-[500] mb-[2px] inline-block'>{label}</label>}
            <TextArea  {...props} />
        </div>
    );
};

export default TextInputNormal;