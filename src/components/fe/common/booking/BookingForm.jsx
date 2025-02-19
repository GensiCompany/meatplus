'use client';

import locationApi from "@/app/api/fe/locationApi";
import { Form, Input, Button, DatePicker, message, Select } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";

const { Option } = Select;


const BookingForm = (props)=> {
    const [form] = Form.useForm(); // Tạo instance của form
    const times=[
        {"label": "09:00", "value": "09:00"},
        {"label": "09:30", "value": "09:30"},
        {"label": "10:00", "value": "10:00"},
        {"label": "10:30", "value": "10:30"},
        {"label": "11:00", "value": "11:00"},
        {"label": "11:30", "value": "11:30"},
        {"label": "12:00", "value": "12:00"},
        {"label": "12:30", "value": "12:30"},
        {"label": "13:00", "value": "13:00"},
        {"label": "13:30", "value": "13:30"},
        {"label": "14:00", "value": "14:00"},
        {"label": "14:30", "value": "14:30"},
        {"label": "15:00", "value": "15:00"},
        {"label": "15:30", "value": "15:30"},
        {"label": "16:00", "value": "16:00"},
        {"label": "16:30", "value": "16:30"},
        {"label": "17:00", "value": "17:00"},
        {"label": "17:30", "value": "17:30"},
        {"label": "18:00", "value": "18:00"},
        {"label": "18:30", "value": "18:30"},
        {"label": "19:00", "value": "19:00"},
        {"label": "19:30", "value": "19:30"},
        {"label": "20:00", "value": "20:00"},
        {"label": "20:30", "value": "20:30"},
        {"label": "21:00", "value": "21:00"},
        {"label": "21:30", "value": "21:30"},
        {"label": "22:00", "value": "22:00"},
        {"label": "22:30", "value": "22:30"},
        {"label": "23:00", "value": "23:00"},
        {"label": "23:30", "value": "23:30"},
        // {"label": "24:00", "value": "24:00"}
    ]
    const [_retreasts, setRetreasts] = useState([]);
    const [loading, setLoading] = useState(false);  

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await locationApi.booking({
                ...values,
                "config": {
                    "host": "smtp.gmail.com",
                    "port": 465,
                    "secure": true,
                    "auth": {
                        "user": "thethongminhgensi@gmail.com",
                        "pass": "qtjsygoswvpsfstm"
                    }
                },
                configEmail: _retreasts.find((item) => item._id === values.configEmail).email,
                date: values.date.format("YYYY-MM-DD"),
            });
            if (response) {
                // Emit sự kiện đóng form
                props.onClose && props.onClose();
                form.resetFields(); 
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error("Failed:", errorInfo);
    };

    const fetchLocations = async () =>{
        try{
            const { data } = await locationApi.getAll();
            setRetreasts(data.retreasts);
        }
        catch (e) {
            console.log(e)
        }
    }
    
    useEffect(() => {
        fetchLocations().then();
    }, [])

    return (
    <div className={'w-full flex-1'}>
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="fullname"
                rules={[
                    { required: true, message: "Vui lòng nhập tên của bạn!" },
                    { max: 50, message: "Tên không được quá 50 ký tự!" },
                ]}
            >
                <Input placeholder="Tên của bạn..." />
            </Form.Item>

            <Form.Item
                name="phone"
                rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                    {
                        pattern: /^[0-9]{10}$/,
                        message: "Số điện thoại phải gồm 10 chữ số!",
                    },
                ]}
            >
                <Input placeholder="Số điện thoại..." />
            </Form.Item>

            <Form.Item
                name="email"
                rules={[
                    { required: true, message: "Vui lòng nhập email!" },
                    { type: "email", message: "Email không hợp lệ!" },
                ]}
            >
                <Input placeholder="Email..." />
            </Form.Item>

            <Form.Item
                name="configEmail"
                rules={[{ required: true, message: "Vui lòng chọn cơ sở!" }]}
            >
                <Select placeholder="Chọn 1 cơ sở">
                    {_retreasts.map((loc) => (
                        <Option key={loc._id} value={loc._id}>
                            {loc.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="date"
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value) {
                                return Promise.reject("Vui lòng chọn ngày!");
                            }
                            const selectedDate = value.startOf("day");
                            const today = moment().startOf("day");

                            if (selectedDate.isBefore(today)) {
                                return Promise.reject("Ngày đặt bàn phải từ hôm nay trở đi!");
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <DatePicker format='YYYY/MM/DD' className="w-full" />
            </Form.Item>

            <Form.Item
                name="time"
                rules={[{ required: true, message: "Vui lòng chọn giờ ăn!" }]}
            >
                <Select placeholder="Chọn giờ ăn">
                    {times.map((time) => (
                        <Option key={time.value} value={time.value}>
                            {time.label}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="numberOfPeople"
                rules={[
                    { required: true, message: "Vui lòng nhập số người ăn!" },
                    {
                        pattern: /^[1-9][0-9]*$/,
                        message: "Số người phải là số dương hợp lệ!",
                    },
                ]}
            >
                <Input placeholder="Số người ăn..." />
            </Form.Item>

            <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-[#f9e20a] text-black hover:!bg-[#f9e20a] hover:!text-black"
            >
                Đặt bàn
            </Button>
        </Form>
    </div>)
}

export default BookingForm;