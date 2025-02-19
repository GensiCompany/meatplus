import React, { useState, useRef } from "react";
import { Modal, Button, Spin, notification } from "antd";
import { Formik, Form } from "formik";
import manageWebsiteInfoApi from "@/app/api/cms/manageWebsiteInfoApi";
import TextInput from "@/components/formikInput/TextInput";

const EditWebsiteInfoModal = ({ setIsShowEditModal, isShowEditModal, refresh, data }) => {
    const [api, contextHolder] = notification.useNotification();
    const [isLoading, setIsLoading] = useState(false);

    const openNotificationWithIcon = (type, title, content) => {
        api[type]({
            message: title,
            description: content,
            placement: "bottomRight",
        });
    };

    const handleOk = async (values) => {
        editWebsiteInfo(values).then();
    };

    const editWebsiteInfo = async (values) => {
        try {
                setIsLoading(true);
                const res = await manageWebsiteInfoApi.editWebsiteInfo({
                    [values?.alias]:values?.value
                });
                openNotificationWithIcon("success", "Thông báo", "Sửa WebsiteInfo thành công");
                refresh();
                handleCancel();
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setIsShowEditModal(false);
        if (resetFormRef.current) {
            resetFormRef.current();
        }
    };
    const resetFormRef = useRef(null);
    return (
        <Modal
            title="Sửa WebsiteInfo"
            open={isShowEditModal}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            width={1170}
        >
            {contextHolder}
            <Spin spinning={isLoading}>
                <Formik
                    initialValues={{ title: data?.title||"", value:data?.value|| "" ,alias:data?.alias|| "" }}
                    onSubmit={(values, { resetForm }) => {
                        handleOk(values);
                    }}
                >
                    {({ values, handleSubmit, setFieldValue, errors, touched, resetForm }) => {
                        resetFormRef.current = resetForm;
                        return (
                            <Form>
                                <TextInput
                                    label="Thông tin"
                                    name="title"
                                    type="text"
                                    disabled
                                ></TextInput>
                                <TextInput
                                    label="Giá trị"
                                    name="value"
                                    type="text"
                                    placeholder="Nhập giá trị"
                                ></TextInput>
                                <div className="mt-4 flex justify-end gap-[10px]">
                                    <Button
                                        className="ml-2"
                                        onClick={() => {
                                            handleCancel();
                                        }}
                                    >
                                        Hủy bỏ
                                    </Button>
                                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                                        Lưu
                                    </Button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </Spin>
        </Modal>
    );
};

export default EditWebsiteInfoModal;
