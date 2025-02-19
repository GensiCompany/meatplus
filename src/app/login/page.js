'use client';

import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "@/components/formikInput/TextInput";
import { signIn } from "next-auth/react";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {notification, Spin} from "antd";

export default function Login() {
    const [pending, setPending] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const router = useRouter();

    const openNotificationWithIcon = (type, title, content) => {
        api[type]({
            message: title,
            description:content,
        });
    };

    const formSubmitted = async (values, isSubmitting) => {
        setPending(true);
        try {
            const res = await signIn('credentials', {
                redirect: false,
                username:values.username,
                password:values.password,
            });
            if (res?.error ) {
                console.log('res error :::: ',res)
                if(res?.status===401){
                    openNotificationWithIcon("error","Thông báo","Sai tài khoản/mật khẩu");
                } else{
                    openNotificationWithIcon("error","Thông báo","Có lỗi xảy ra thử lại sau");
                }
                setPending(false);
            } else {
                setPending(false);
                await router.push("/cms");

            }
        } catch (error) {
            console.error("Login error:", error);
            openNotificationWithIcon("error","Thông báo","Có lỗi xảy ra thử lại sau");
            setPending(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center min-h-[100vh] bg-[#F5F5F5]">
            {contextHolder}
            <div className='flex flex-col justify-center items-center bg-white rounded-[5px]' style={{
                boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            }}>
                <Image src={Logo.src} width={100} height={100} alt="logo"></Image>
                <p className="text-[20px] font-[700] px-[20px] py-[12px]">HỆ THỐNG QUẢN TRỊ WEBSITE</p>
                <Spin spinning={pending} >
                    <div className="w-[300px] p-[20px] border-t-[1px] border-t-[rgba(0, 0, 0, .125)] w-full">
                        <Formik
                            initialValues={{
                                username: "",
                                password: "",
                            }}
                            validationSchema={Yup.object({
                                username: Yup.string()
                                    .required("Vui lòng nhập tên đăng nhập"),
                                password: Yup.string()
                                    // .min(6, "Mật khẩu ít nhất 6 ký tự")
                                    .required("Vui lòng nhập mật khẩu"),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                formSubmitted(values,setSubmitting)
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <TextInput
                                        label="Tên đăng nhập"
                                        name="username"
                                        type="text"
                                        placeholder="Nhập tên đăng nhập"
                                    />
                                    <TextInput
                                        label="Mật khẩu"
                                        name="password"
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-blue-500 text-white py-1 rounded mt-[8px]"
                                    >
                                        Đăng nhập
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Spin>
            </div>
        </div>
    );
}
