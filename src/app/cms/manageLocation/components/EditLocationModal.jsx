"use client";

import React, {useState, useEffect, useRef} from "react";
import {Modal, Button, Spin, notification} from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import manageLocationApi from "@/app/api/cms/manageLocationApi";
import TextInput from "@/components/formikInput/TextInput";
import ManageImage from "@/components/manageImage/ManageImage";
import Image from "next/image";
import {getImageLink} from "@/utils/common";
import {Editor} from "@tinymce/tinymce-react";
import ManageImageModal from "@/components/manageImage/ManageImageModal";
import TextAreaInput from "@/components/formikInput/TextAreaInput";

const EditLocationModal = ({ setIsShowCreateModal, isShowCreateModal,refresh,data }) => {
    const [api, contextHolder] = notification.useNotification();

    const [isLoading,setIsLoading] = useState(false);
    const [content, setContent] = useState(data?.promotionContent||"");

    const openNotificationWithIcon = (type, title, content) => {
        api[type]({
            message: title,
            description:content,
            placement:'bottomRight'
        });
    };
    const handleOk = async (values) => {
        try{
            setIsLoading(true);
            const res=await manageLocationApi.editLocation(data["_id"],{...values})
            openNotificationWithIcon("success","Thông báo","Sửa cơ sở thành công");
            refresh();
            handleCancel()
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setIsLoading(false)
        }
    };

    const handleCancel = () => {
        setIsShowCreateModal(false);
        if (resetFormRef.current) {
            resetFormRef.current();
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Vui lòng điền tên cơ sở."),
        address: Yup.string().required("Vui lòng điền địa chỉ."),
        email: Yup.string().required("Vui lòng điền email."),
        facebook_link: Yup.string().required("Vui lòng điền Facebook."),
        phoneNumber: Yup.string().required("Vui lòng điền Hotline."),
        lat: Yup.string().required("Vui lòng điền vĩ độ."),
        lng: Yup.string().required("Vui lòng điền kinh độ."),
        map: Yup.string().required("Vui lòng điền bản đồ."),
        imageUrl: Yup.string().required("Vui lòng chọn ảnh."),
    });
    const resetFormRef = useRef(null);
    return (
        <Modal
            title="Sửa cơ sở"
            open={isShowCreateModal}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            width={1170}
        >
            {contextHolder}
            <Spin spinning={isLoading}>
                <Formik
                    initialValues={{name:data?.name||"", address:data?.address||"",email:data?.email||"",facebook_link:data?.facebook_link||"",phoneNumber:data?.phoneNumber||"",imageUrl:data?.imageUrl||"",map:data?.map||"",lat:data?.lat||"",lng:data?.lng||""}}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        handleOk(values).then();
                    }}
                >
                    {({ values,handleSubmit,setFieldValue,errors, touched,resetForm }) => {
                        resetFormRef.current = resetForm;
                        return (<Form>
                                <TextInput
                                    label="Tên cơ sở"
                                    name="name"
                                    type="text"
                                    placeholder="Nhập tên cơ sở">
                                </TextInput>
                                <TextInput
                                    label="Địa chỉ"
                                    name="address"
                                    type="text"
                                    placeholder="Nhập địa chỉ">
                                </TextInput>
                                <TextInput
                                    label="Facebook"
                                    name="facebook_link"
                                    type="text"
                                    placeholder="Nhập Facebook">
                                </TextInput>
                                <TextInput
                                    label="Hotline"
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Nhập Hotline">
                                </TextInput>
                                <TextInput
                                    label="Email"
                                    name="email"
                                    type="text"
                                    placeholder="Nhập kinh độ">
                                </TextInput>
                                <TextInput
                                    label="Kinh độ"
                                    name="lng"
                                    type="text"
                                    placeholder="Nhập Email">
                                </TextInput>
                                <TextInput
                                    label="Vĩ độ"
                                    name="lat"
                                    type="text"
                                    placeholder="Nhập vĩ độ">
                                </TextInput>
                                <TextAreaInput
                                    label="Bản đồ"
                                    name="map"
                                    type="text"
                                    placeholder="Nhập bản đồ">
                                </TextAreaInput>

                                <div className={'mb-[12px]'}>
                                    <ManageImage title={"Chọn ảnh cơ sở"} onChooseImage={(image) => {
                                        setFieldValue("imageUrl", image?.source).then();
                                    }}></ManageImage>

                                    {values?.imageUrl &&
                                        <Image src={getImageLink(values?.imageUrl)} alt={"banner"} width={1920}
                                               height={120}
                                               className={'w-full h-[120px] object-cover mt-[10px]'}></Image>}
                                    {errors.imageUrl && touched.imageUrl && (
                                        <p className="text-red-500 text-sm">{errors.imageUrl}</p>
                                    )}
                                </div>
                                <div className="mt-4 flex justify-end gap-[10px]">
                                    <Button className="ml-2" onClick={() => {
                                        handleCancel();
                                    }}>
                                        Hủy bỏ
                                    </Button>
                                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                                        Thêm
                                    </Button>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </Spin>
        </Modal>
    );
};

export default EditLocationModal;
