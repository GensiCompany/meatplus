"use client";

import React from 'react';
import { useField } from 'formik';
import {Input} from "antd";

const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className='mb-[12px] w-full'>
            {label && <label htmlFor={props.id || props.name} className='text-[14px] font-[500] mb-[2px] inline-block'>{label}</label>}

            <Input {...field} {...props} />

            {meta.touched && meta.error ? (
                <div className='text-[12px] text-red-600 mt-[4px]'>{meta.error}</div>
            ) : null}
        </div>
    );
};

export default TextInput;