'use client';

import React, { useState} from "react";
import {UploadOutlined} from "@ant-design/icons";
import {Button} from "antd";
import ManageImageModal from "@/components/manageImage/ManageImageModal";
const ManageImage =({onChooseImage,title})=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    return <div>
        <div >
            <label className="text-[14px] font-[500] mb-[2px] inline-block">{title?title:"Chọn hình ảnh"}</label>
            <div>
                <Button icon={<UploadOutlined/>} onClick={showModal}>Chọn hình ảnh</Button>
            </div>
        </div>
        <ManageImageModal onChooseImage={onChooseImage} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}></ManageImageModal>
    </div>
}

export default ManageImage;