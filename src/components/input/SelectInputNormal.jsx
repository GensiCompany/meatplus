"use client";

import React from "react";
import { Select } from "antd";

const { Option } = Select;

const SelectFieldNormal = ({ name, label, options, placeholder = "Select an option", ...rest }) => {
    return (
        <div className={'mb-[12px] w-full'}>
            {label && <label className={'text-[14px] font-[500] mb-[2px] inline-block'}>{label}</label>}
            <Select
                placeholder={placeholder}
                style={{
                    width: "100%",
                }}
                {...rest}
            >
                {options.map((option) => (
                    <Option key={option.value} value={option.value}>
                        {option.label || option.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default SelectFieldNormal;
