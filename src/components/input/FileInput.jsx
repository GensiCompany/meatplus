import React from "react";
import { useField, useFormikContext } from "formik";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

const FileInput = ({ label, maxFileSize, accept, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const { setFieldValue } = useFormikContext();

    const handleFileChange = (info) => {
        const file = info.file.originFileObj;

        if (file) {
            if (accept && !accept.split(",").includes(file.type)) {
                helpers.setError(`Only files of type ${accept} are allowed.`);
                return;
            }

            if (maxFileSize && file.size > maxFileSize) {
                helpers.setError(`File size exceeds the maximum limit of ${maxFileSize / (1024 * 1024)} MB.`);
                return;
            }

            helpers.setError(undefined);
            setFieldValue(props.name, file);
        }
    };

    return (
        <div className="mb-[12px]">
            {label && (
                <label htmlFor={props.id || props.name} className="text-[14px] font-[500] mb-[2px] inline-block">
                    {label}
                </label>
            )}

            <Upload
                beforeUpload={() => false}
                onChange={handleFileChange}
                accept={accept}
                showUploadList={false}
            >
                <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>

            {/*{meta?.touched && meta?.error ? (*/}
            {/*    <div className="text-[12px] text-red-600 mt-[4px]">{meta.error}</div>*/}
            {/*) : null}*/}
        </div>
    );
};

export default FileInput;
