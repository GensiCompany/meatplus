"use client";

import React from "react";
import { Select } from "antd";
import { useFormikContext } from "formik";

const { Option } = Select;

const SelectField = ({ name, label, options, placeholder = "Select an option", ...rest }) => {
    const { values, setFieldValue, errors, touched } = useFormikContext();

    const handleChange = (value) => {
        setFieldValue(name, value);
    };

    const hasError = errors[name] && touched[name];

    return (
        <div className={'mb-[12px] w-full'}>
            {label && <label className={'text-[14px] font-[500] mb-[2px] inline-block'}>{label}</label>}
            <Select
                value={values[name]}
                onChange={handleChange}
                placeholder={placeholder}
                style={{
                    width: "100%",
                    borderColor: hasError ? "red" : undefined,
                }}
                {...rest}
            >
                {options.map((option) => (
                    <Option key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                ))}
            </Select>
            {hasError && (
                <div style={{ color: "red", marginTop: "4px", fontSize: "12px" }}>
                    {errors[name]}
                </div>
            )}
        </div>
    );
};

export default SelectField;
