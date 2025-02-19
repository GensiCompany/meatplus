"use client";

import React, {useState, useEffect, useRef} from "react";
import {Modal, Button, Spin, notification} from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import manageNewsApi from "@/app/api/cms/manageNewsApi";
import ManageImage from "@/components/manageImage/ManageImage";
import TextInput from "@/components/formikInput/TextInput";
import Image from "next/image";
import {getImageLink} from "@/utils/common";
import {Editor} from "@tinymce/tinymce-react";
import ManageImageModal from "@/components/manageImage/ManageImageModal";

const EditNewsModal = ({ setIsShowCreateModal, isShowCreateModal,refresh ,data}) => {
    const [api, contextHolder] = notification.useNotification();

    const [isLoading,setIsLoading] = useState(false);

    const [isShowModalImage, setIsShowModalImage] = useState(false);
    const [editorCallback, setEditorCallback] = useState(null);

    const openNotificationWithIcon = (type, title, content) => {
        api[type]({
            message: title,
            description:content,
            placement:'bottomRight'
        });
    };
    const [content, setContent] = useState(data?.content||"");

    const handleEditorChange = (content) => {
        setContent(content);
    };

    const handleOk = async (values) => {
        createBanner(values).then();
    };

    const createBanner = async(values)=>{
        try{
            if(!content){
                openNotificationWithIcon("error", "Thông báo", "Vui lòng nhập nội dung");
            } else{
                setIsLoading(true);
                const res=await manageNewsApi.editNews(data["_id"],{...values,content:content});
                openNotificationWithIcon("success","Thông báo","Thêm tin tức thành công");
                refresh();
                handleCancel();
            }
        }
        catch (e) {
            console.log(e)
        }finally {
            setIsLoading(false);
        }
    }
    const handleCancel = () => {
        setIsShowCreateModal(false);
        if (resetFormRef.current) {
            resetFormRef.current();
        }
    };

    const validationSchema = Yup.object().shape({
        imageUrl: Yup.string().required("Vui lòng chọn ảnh."),
        name: Yup.string().required("Vui lòng chọn tiêu đề."),
        shortDescription: Yup.string().required("Vui lòng điền mô tả ngắn."),
    });

    const resetFormRef = useRef(null);
    return (
        <Modal
            title="Thêm tin tức"
            open={isShowCreateModal}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            width={1170}
        >
            {contextHolder}
            <Spin spinning={isLoading}>
                <Formik
                    initialValues={{ imageUrl: data?.imageUrl||"", name:data?.name||"",shortDescription:data?.shortDescription||"",}}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        handleOk(values);
                    }}
                >
                    {({ values,handleSubmit,setFieldValue,errors, touched,resetForm }) => {
                        resetFormRef.current = resetForm;
                        return (<Form>
                                <div className={'mb-[12px]'}>
                                    <TextInput
                                        label="Tiêu đề"
                                        name="name"
                                        type="text"
                                        placeholder="Nhập tên khuyến mại"
                                    ></TextInput>

                                    <TextInput
                                        label="Mô tả ngắn"
                                        name="shortDescription"
                                        type="text"
                                        placeholder="Nhập tên mô tả ngắn"
                                    ></TextInput>

                                    <ManageImage title={"Chọn hình ảnh thumbnail"} onChooseImage={(image) => {
                                        setFieldValue("imageUrl", image?.source).then();
                                    }}></ManageImage>

                                    {values?.imageUrl && <Image src={getImageLink(values?.imageUrl)} alt={"banner"} width={1920} height={120 } className={'w-full h-[120px] object-cover mt-[10px]'}></Image>}
                                    {errors.imageUrl && touched.imageUrl && (
                                        <p className="text-red-500 text-sm">{errors.imageUrl}</p>
                                    )}
                                </div>

                                {<label className='text-[14px] font-[500] mb-[2px] inline-block'>Nội dung</label>}
                                <Editor
                                    apiKey="ko66q0g216w0296ekdu0hu5olo43brk1b3xutehpj0jemv4w"
                                    init={{
                                        plugins: [
                                            "emoticons",
                                            "image",
                                            "link",
                                            "lists",
                                            "media",
                                            "table",
                                            'textcolor'
                                        ],
                                        toolbar:
                                            "undo redo | blocks fontfamily fontsize | bold italic underline  forecolor backcolor  | link image media table | align lineheight | checklist numlist bullist indent outdent | emoticons |",
                                        tinycomments_mode: "embedded",
                                        tinycomments_author: "Author name",
                                        file_picker_callback: (callback, value, meta) => {
                                            setEditorCallback(() => callback);
                                            setIsShowModalImage(true);
                                        },
                                    }}
                                    initialValue={data?.content||""}
                                    onEditorChange={handleEditorChange}
                                />
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
            <ManageImageModal
                onChooseImage={(image) => {
                    if (editorCallback) {
                        editorCallback(image.source);
                        setEditorCallback(null);
                    }
                    setIsShowModalImage(false);
                }}
                setIsModalOpen={setIsShowModalImage}
                isModalOpen={isShowModalImage}
            ></ManageImageModal>
        </Modal>
    );
};

export default EditNewsModal;
