import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Spin, notification } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import manageMenuApi from "@/app/api/cms/manageMenuApi";
import SelectInput from "@/components/formikInput/SelectInput";
import TextInput from "@/components/formikInput/TextInput";
import { getImageLink } from "@/utils/common";
import { Editor } from "@tinymce/tinymce-react";
import ManageImageModal from "@/components/manageImage/ManageImageModal";
import ManageImage from "@/components/manageImage/ManageImage";
import Image from "next/image";

const CreateMenuModal = ({ setIsShowCreateModal, isShowCreateModal, refresh, data }) => {
    const [api, contextHolder] = notification.useNotification();
    const [isLoading, setIsLoading] = useState(false);

    const [content, setContent] = useState(data?.content||"");
    const [isShowModalImage, setIsShowModalImage] = useState(false);
    const [editorCallback, setEditorCallback] = useState(null);
    const [tempItem,setTempItem] = useState({imageUrl:data?.imageUrl}||"")

    const handleEditorChange = (content) => {
        setContent(content);
    };

    const openNotificationWithIcon = (type, title, content) => {
        api[type]({
            message: title,
            description: content,
            placement: "bottomRight",
        });
    };

    const handleOk = async (values) => {
        editMenu(values).then();
    };

    const editMenu = async (values) => {
        try {
            if(!content){
                openNotificationWithIcon("error", "Thông báo", "Vui lòng nhập nội dung");
            } else if(!tempItem){
                openNotificationWithIcon("error", "Thông báo", "Vui lòng chọn ảnh menu");
            } else{
                setIsLoading(true);
                const res = await manageMenuApi.editMenu({...values,content,imageUrl:tempItem?.imageUrl},data?._id);
                openNotificationWithIcon("success", "Thông báo", "Thêm Menu thành công");
                refresh();
                handleCancel();
            }
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setIsShowCreateModal(false);
        if (resetFormRef.current) {
            resetFormRef.current();
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Vui lòng điền tên menu."),
        title: Yup.string().required("Vui lòng điền tiêu đề."),
        type: Yup.string().required("Vui lòng chọn loại menu."),
    });

    const resetFormRef = useRef(null);
    return (
        <Modal
            title="Sửa Menu"
            open={isShowCreateModal}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            width={1170}
        >
            {contextHolder}
            <Spin spinning={isLoading}>
                <Formik
                    initialValues={{ name: data?.name||"", title: data?.title||"", type:data?.type|| "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        handleOk(values);
                    }}
                >
                    {({ values, handleSubmit, setFieldValue, errors, touched, resetForm }) => {
                        resetFormRef.current = resetForm;
                        return (
                            <Form>
                                <div className="flex justify-around gap-[15px] mb-[12px]">
                                    <TextInput
                                        label="Tên menu"
                                        name="name"
                                        type="text"
                                        placeholder="Nhập tên menu"
                                    ></TextInput>
                                    <TextInput
                                        label="Tiêu đề"
                                        name="title"
                                        type="text"
                                        placeholder="Nhập tiêu đề"
                                    ></TextInput>
                                    <SelectInput
                                        name={"type"}
                                        placeholder={"Chọn loại menu"}
                                        label={"Chọn loại menu"}
                                        options={[
                                            {
                                                label: "MENU THỊT",
                                                value: "MENU",
                                            },
                                            {
                                                label: "MENU CƠ SỞ",
                                                value: "COMBO",
                                            },
                                        ]}
                                    ></SelectInput>
                                </div>
                                <div className={'mb-[12px]'}>
                                    <ManageImage onChooseImage={(image) => {
                                        setTempItem(prev => ({...prev, imageUrl: image?.source}));
                                    }} title={"Chọn ảnh menu"}></ManageImage>
                                    {tempItem?.imageUrl &&
                                        <Image src={getImageLink(tempItem?.imageUrl)} alt={"banner"} width={1920}
                                               height={120}
                                               className={'w-full h-[120px] object-cover mt-[10px]'}></Image>}
                                </div>
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
                                    initialValue={data?.content || ""}
                                    onEditorChange={handleEditorChange}
                                />
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
                                        Thêm
                                    </Button>
                                </div>
                            </Form>
                        );
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

export default CreateMenuModal;
