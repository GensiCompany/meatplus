"use client";

import React, {useState, useEffect, useRef} from "react";
import {Modal, Button, Spin, notification} from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ManageImage from "@/components/manageImage/ManageImage";
import SelectInput from "@/components/formikInput/SelectInput";
import TextInputNormal from "@/components/input/TextInputNormal";
import Image from "next/image";
import {getImageLink} from "@/utils/common";
import {MdEdit} from "react-icons/md";
import {FaTrash} from "react-icons/fa";
import manageSectionApi from "@/app/api/cms/manageSectionApi";
import TextInput from "@/components/formikInput/TextInput";

const CreateSectionModal = ({ setIsShowCreateModal, isShowCreateModal,refresh,total }) => {
    const [api, contextHolder] = notification.useNotification();

    const [isLoading,setIsLoading] = useState(false);

    const [isOpenAddItemModal,setIsOpenAddItemModal] = useState(false);
    const [listItem,setListItem] = useState([]);
    const [tempItem,setTempItem] = useState()
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
            const res=await manageSectionApi.createSection({...values,options:listItem,order:total})
            openNotificationWithIcon("success","Thông báo","Thêm section thành công");
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
        setListItem([])
        setTempItem(null)
        setIsOpenAddItemModal(false)
        if (resetFormRef.current) {
            resetFormRef.current();
        }
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Vui lòng điền tiêu đề."),
        appearTransition: Yup.string().required("Vui lòng chọn hiệu ứng xuất hiện."),
        type: Yup.string().required("Vui lòng chọn loại section."),
    });

    const resetFormRef = useRef(null);
    return (
        <Modal
            title="Thêm Section"
            open={isShowCreateModal}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            width={1170}
        >
            {contextHolder}
            <Spin spinning={isLoading}>
                <Formik
                    initialValues={{title:"", appearTransition:"",type:""}}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        handleOk(values).then();
                    }}
                >
                    {({ values,handleSubmit,setFieldValue,errors, touched,resetForm }) => {
                        resetFormRef.current = resetForm;
                        return (<Form>
                                <div className={'flex justify-around gap-[15px] mb-[12px]'}>
                                    <TextInput
                                        label="Tiêu đề"
                                        name="title"
                                        maxLength={255}
                                        type="text"
                                        placeholder="Nhập tiêu đề"></TextInput>
                                    <SelectInput name={"appearTransition"} placeholder={"Chọn hiệu ứng xuất hiện"}
                                                 label={"Chọn hiệu ứng xuất hiện"} options={[
                                        {
                                            label:"LEFT_TO_RIGHT",
                                            value:"LEFT_TO_RIGHT"
                                        },
                                        {
                                            label:"RIGHT_TO_LEFT",
                                            value:"RIGHT_TO_LEFT"
                                        },
                                        {
                                            label:"TOP_TO_BOTTOM",
                                            value:"TOP_TO_BOTTOM"
                                        },
                                        {
                                            label:"BOTTOM_TO_TOP",
                                            value:"BOTTOM_TO_TOP"
                                        }
                                    ]}></SelectInput>
                                    <SelectInput name={"type"} placeholder={"Chọn loại section"}
                                                 label={"Chọn loại section"} options={[
                                        {
                                            label:"SINGLE",
                                            value:"SINGLE",
                                            disabled:listItem?.length>1
                                        },
                                        {
                                            label:"MULTIPLE",
                                            value:"MULTIPLE"
                                        },
                                        {
                                            label:"SLIDE",
                                            value:"SLIDE"
                                        }
                                    ]}></SelectInput>
                                </div>
                                <div>
                                    <p className={'text-[14px] font-[500] mb-[2px] block'}>Nội dung</p>
                                    <div className={'flex flex-wrap gap-[15px]'}>
                                        {listItem?.map((item,i)=>(<div key={i} className={'w-[120px] p-[10px] rounded-[8px] relative'} style={{border:'1px solid #ccc'}}>
                                            <div className={'absolute flex gap-[8px] right-[5px] top-[5px] text-white p-[5px] rounded-[5px]'} style={{backgroundColor:'var(--primary)'}}>
                                                <MdEdit className={'cursor-pointer'} onClick={()=>{setTempItem(item); setIsOpenAddItemModal(true)}}/>
                                                <FaTrash className={'cursor-pointer'} onClick={()=>{setListItem(prev=>prev.filter(x=>x.id!==item.id))}}/>
                                            </div>
                                            <Image src={getImageLink(item?.imageUrl)} alt={"section item"} width={1920} height={1080} objectFit={'cover'} className={'w-[100px] object-cover h-[100px]'}></Image>
                                            <p className={'text-ellipsis overflow-hidden truncate whitespace-nowrap'} title={item?.link}>{item?.link}</p>
                                        </div>))}
                                        {!(values?.type==="SINGLE" &&listItem.length===1) && <Button type={'primary'} onClick={() => {
                                            setIsOpenAddItemModal(true)
                                        }}>Thêm</Button>}
                                    </div>
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

            <Modal title="Thêm nội dung"
                    open={isOpenAddItemModal}
                    onOk={()=>{
                        if(tempItem?.imageUrl) {
                            if(tempItem?.id) {
                                setListItem(prev=> {
                                    const newPrev=[...prev]
                                        return newPrev.map(x=> {
                                            if(x.id === tempItem.id){
                                                return {...tempItem}
                                            }else return x;
                                        })
                                })

                            }else{
                                setListItem(prev=>[...prev, {...tempItem,id:Math.random()}])
                            }
                            setTempItem(null)
                            setIsOpenAddItemModal(false)
                        } else {
                            openNotificationWithIcon("error","Thông báo","Vui lòng chọn ảnh");
                        }
                    }}
                    onCancel={()=>{
                        setIsOpenAddItemModal(false)
                        setTempItem(null)
                    }}
                    cancelText={"Hủy"}
                    okText={"Thêm"}
            >
                <div className={'mb-[12px]'}>
                    <ManageImage onChooseImage={(image) => {
                        setTempItem(prev=>({...prev,imageUrl:image?.source}));
                    }}></ManageImage>
                    {tempItem?.imageUrl && <Image src={getImageLink(tempItem?.imageUrl)} alt={"banner"} width={1920} height={120 } className={'w-full h-[120px] object-cover mt-[10px]'}></Image>}
                </div>
                <TextInputNormal label={"Link"} value={tempItem?.link} onChange={(e)=>{setTempItem(prev=>({...prev, link: e.target.value}))}}></TextInputNormal>
            </Modal>
        </Modal>
    );
};

export default CreateSectionModal;
