'use client';

import {Button, notification, Spin, Table} from "antd";
import HeaderPage from "@/components/cms/headerPage/HeaderPage";
import LayoutPage from "@/components/cms/LayoutPage";
import HeaderAction from "@/components/cms/headerPage/HeaderAction";
import React, {useEffect, useState} from "react";
import manageWebsiteInfoApi from "@/app/api/cms/manageWebsiteInfoApi";
import {MdEdit} from "react-icons/md";
import EditWebsiteInfoModal from "@/app/cms/manageWebsiteInfo/components/EditWebsiteInfoModal";

const breadScrum = [
    {
        title:'Quản lý hệ thống'
    },
    {
        title:'Quản lý thông tin Website'
    },
    {
        title:'Danh sách thông tin Website'
    },
]

const pageSize=10;
export default function ManageWebsiteInfo() {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, title, content) => {
        api[type]({
            message: title,
            description:content,
            placement:'bottomRight'
        });
    };
    const [isShowEditModal,setIsShowEditModal] = useState(false);
    const [isLoading,setIsLoading] = useState(false)
    const [banners,setWebsiteInfos] = useState([]);
    const [page,setPage]=useState(1);

    const [selectedWebsiteInfo,setSelectedWebsiteInfo] = useState()

    const columns = [
        {
            title: "STT",
            align: "center",
            width: "50px",
            render: (text, record, index) => {
                return (page-1) * pageSize+ index + 1;
            },
        },
        {
            title: 'Thông tin',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Giá trị',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: '',
            key: 'func',
            width: 100,
            render: (data,record) => <div className='flex gap-[10px] items-center'>
                <Button type={'primary'} icon={ <MdEdit />} onClick={()=>{
                    setSelectedWebsiteInfo(record)
                    setIsShowEditModal(true)
                }}>Sửa</Button>
            </div>,
        },

    ]

    const headerAction = <HeaderAction>
    </HeaderAction>
    const fetchWebsiteInfo =async ()=>{
        try{
            setIsLoading(true);
            const res=await manageWebsiteInfoApi.getAllWebsiteInfo();
            const settings =[{
                title:"Địa chỉ",
                value:res?.data?.setting?.address,
                alias:"address"
            },
                {
                    title:"Số điện thoại nhượng quyền",
                    value:res?.data?.setting?.phone_nhuong_quyen,
                    alias:"phone_nhuong_quyen"
                },
                {
                    title:"Email",
                    value:res?.data?.setting?.email,
                    alias:"email"
                },
                {
                    title:"Đăng ký nhãn hiệu số",
                    value:res?.data?.setting?.registration,
                    alias:"registration"
                },
                {
                    title:"Facebook",
                    value:res?.data?.setting?.facebook,
                    alias:"facebook"
                },
                {
                    title:"Instagram",
                    value:res?.data?.setting?.instagram,
                    alias:"instagram"
                },
                {
                    title:"Twitter",
                    value:res?.data?.setting?.twitter,
                    alias:"twitter"
                },
                {
                    title:"Youtube",
                    value:res?.data?.setting?.currency,
                    alias:"currency"
                },
                {
                    title:"Giới thiệu",
                    value:res?.data?.setting?.introduction,
                    alias:"introduction"
                },
                {
                    title:"Website",
                    value:res?.data?.setting?.website,
                    alias:"website"
                }]
            setWebsiteInfos(settings);
        }catch (e) {
            console.log(e);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchWebsiteInfo().then();
    }, []);

    console.log(selectedWebsiteInfo)

    return (
        <LayoutPage>
            {contextHolder}
            {isShowEditModal&&<EditWebsiteInfoModal isShowEditModal={isShowEditModal} setIsShowEditModal={setIsShowEditModal}
                                             data={selectedWebsiteInfo} refresh={() => {
                fetchWebsiteInfo().then();
                setSelectedWebsiteInfo(null)
            }} setSelectedWebsiteInfo={setSelectedWebsiteInfo}
            ></EditWebsiteInfoModal>}

            <HeaderPage title={"Quản lý thông tin Website"} breadScrum={breadScrum} action={headerAction}></HeaderPage>
            <Spin spinning={isLoading} className={'mt-[20px]'}>
                <Table columns={columns} dataSource={banners} rowKey={'id'} pagination={{
                    onChange:(page)=>{
                        setPage(page-1)
                    }
                }}></Table>
            </Spin>
        </LayoutPage>
    );
}
