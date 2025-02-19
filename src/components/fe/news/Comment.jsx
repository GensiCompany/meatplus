'use client';

import {Button, Checkbox, notification, Spin} from "antd";
import React, {useState} from "react";
import {Form, Formik} from "formik";
import TextInput from "@/components/formikInput/TextInput";
import * as Yup from "yup";
import TextAreaInput from "@/components/formikInput/TextAreaInput";
import manageMenuApi from "@/app/api/cms/manageMenuApi";
import contactsApi from "@/app/api/fe/contactsApi";

const Comment =()=> {
    const [isLoading,setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, title, content) => {
        api[type]({
            message: title,
            description: content,
            placement: "bottomRight",
        });
    };
    const validationSchema = Yup.object().shape({
        feedback: Yup.string().required("Vui lòng điền ý kiến."),
        name: Yup.string().required("Vui lòng điền họ tên."),
        email: Yup.string().required("Vui lòng chọn email."),
    });

    const handleOk = async (values) => {
        createMenu(values).then();
    };

    const createMenu = async (values) => {
        try {
            setIsLoading(true);
            const res = await contactsApi.createContacts({...values,origin:"meatplussynckiovn.synck.io.vn"});
            openNotificationWithIcon("success", "Thông báo", "Thêm ý kiến thành công");
        } catch (e) {
            console.log(e);
            openNotificationWithIcon("error", "Thông báo", "Có lỗi xảy ra thử lại sau!");
        } finally {
            setIsLoading(false);
        }
    };

    return <Spin spinning={isLoading}>
        {contextHolder}
        <div className={'px-[25px] py-[15px] mt-[15px] bg-[rgba(0,0,0,.05)]'}>
            <p className={'text-[#555] text-[20px] font-[700]'}>Để lại một bình luận</p>
            <p className={'text-[16px] mt-[12px] mb-[6px] text-[#777]'}>Email của bạn sẽ không được hiển thị công khai.
                Các trường bắt buộc được đánh dấu *</p>

            <Formik
                initialValues={{ feedback: "", name: "", email: "",website:"" }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    handleOk(values);
                }}
            >
                {({ values, handleSubmit,}) => {
                    return (
                        <Form>
                            <TextAreaInput name={'feedback'} label={"Bình luận *"} rows={5}></TextAreaInput>
                            <div className={'flex flex-col sm:flex-row gap-[20px]'}>
                                <TextInput name={'name'} label={"Tên *"} className={"flex-1"}></TextInput>
                                <TextInput name={'email'} label={"Email *"} className={"flex-1"}></TextInput>
                                <TextInput name={'website'} label={"Trang web"} className={"flex-1"}></TextInput>
                            </div>

                            <div className={'flex  gap-[6px] items-center'}>
                                <Checkbox></Checkbox>
                                <label className={'inline-block text-[14px] font-[700] text-[#222]'}>Lưu tên của tôi, email, và trang
                                    web trong trình duyệt này cho lần bình luận kế tiếp của tôi.</label>
                            </div>
                            <Button className={"text-black font-[700] bg-[#f9e20a] mt-[10px]"} onClick={()=>{
                                handleSubmit()
                            }}>GỬI BÌNH LUẬN</Button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    </Spin>

}

export default Comment;