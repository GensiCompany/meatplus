'use client';

import {notification, Spin} from "antd";

export default function Login() {
    const [api, contextHolder] = notification.useNotification();

    return (
        <div className="w-full h-full flex flex-col items-center justify-center min-h-[100vh] bg-[#F5F5F5]">
            {contextHolder}
        </div>
    );
}
