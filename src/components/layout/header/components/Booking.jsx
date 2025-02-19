'use client';
import {FaBookmark} from "react-icons/fa";
import classes from "../style/header.module.css"
import {Modal} from "antd";
import {useState} from "react";
import BookingForm from "@/components/fe/common/booking/BookingForm";

const Booking = ()=>{
    const [isOpenBooking,setIsOpenBooking] = useState(false);
    const handleClose = () => {
        setIsOpenBooking(false); // Ví dụ: đóng form bằng cách thay đổi state
    };
    return <>
        <div className={`flex rounded-[5px] border-[2px] border-[#ebd4d3] px-[11px] gap-[4px] items-center text-[#ebd4d3] ml-[12px] ${classes.booking}`} onClick={()=>{setIsOpenBooking(prev=>!prev)}}>
            <FaBookmark size={21}/>
            <span className='text-[19px] font-[700] p-[6px]'>ĐẶT BÀN</span>
        </div>
        <Modal open={isOpenBooking} footer={null} onCancel={() => {
            setIsOpenBooking(false)
        }}>
            <p className={"text-[30px] text-[var(--primary)] text-center mb-[4px] font-[700]"}>ĐẶT BÀN MEAT PLUS</p>
            <p className={'text-[14px] text-black text-center mb-[4px]'}>Vui lòng đặt trước từ 1 đến 3h để được phục vụ tốt
                nhất</p>
            <BookingForm onClose={handleClose}></BookingForm>
        </Modal>
    </>
}

export default Booking;