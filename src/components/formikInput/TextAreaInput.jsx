"use client";

import React from 'react';
import TextArea from "antd/es/input/TextArea";
import {useField} from "formik";

const TextInputNormal = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className='mb-[12px] w-full'>
            {label && <label htmlFor={props.id || props.name} className='text-[14px] font-[500] mb-[2px] block'>{label}</label>}
            <TextArea  {...field} {...props} />

            {meta.touched && meta.error ? (
                <div className='text-[12px] text-red-600 mt-[4px]'>{meta.error}</div>
            ) : null}
        </div>
    );
};

export default TextInputNormal;