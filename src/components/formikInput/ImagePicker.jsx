"use client";

import React, { useState } from "react";
import { useFormikContext } from "formik";
import {Button, notification, Upload} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";
import classes from "./style/imagePicker.module.css"

const ImagePicker = ({ name, label, accept = "image/*", maxFileSize = 10 * 1024 * 1024 }) => {
    const { setFieldValue, errors, touched } = useFormikContext();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, title, content) => {
        api[type]({
            message: title,
            description:content,
        });
    };
    const [preview, setPreview] = useState(null);

    const handleFileChange = (info) => {
        const lastFile = info.fileList[info.fileList.length - 1];

        if (!lastFile || !lastFile.originFileObj) {
            console.error("No valid file found");
            return;
        }

        const file = lastFile.originFileObj;

        if (!file.type.startsWith("image/")) {
            openNotificationWithIcon("error","Thông báo","File không hợp lệ. Vui lòng chọn file khác");
            return;
        }

        const maxFileSize = 10 * 1024 * 1024;
        if (file.size > maxFileSize) {
            openNotificationWithIcon("error","Thông báo","Vui lòng chọn file nhỏ hơn 10MB");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
        setFieldValue(name, file);
    };


    return (
        <div className="mb-4">
            {contextHolder}
            {label && <label className="block text-sm font-medium mb-2">{label}</label>}
            <Upload
                beforeUpload={() => false}
                onChange={handleFileChange}
                showUploadList={false}
            >
                <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
            </Upload>
            {preview && (
                <div className={`mt-4 ${classes.imagePreviewContainer}`}>
                    <Image
                        src={preview}
                        alt="Preview banner"
                        fill
                        style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "200px" }}
                    />
                </div>
            )}
            {touched[name] && errors[name] && (
                <div className="text-red-600 text-sm mt-2">{errors[name]}</div>
            )}
        </div>
    );
};

export default ImagePicker;