'use client';

import { Spin, Table} from "antd";
import HeaderPage from "@/components/cms/headerPage/HeaderPage";
import LayoutPage from "@/components/cms/LayoutPage";
import HeaderAction from "@/components/cms/headerPage/HeaderAction";
import React, {useEffect, useState} from "react";
import manageFeedbacksApi from "@/app/api/cms/manageFeedbacksApi";

const breadScrum = [
    {
        title:'Quản lý hệ thống'
    },
    {
        title:'Quản lý ý kiến khách hàng'
    },
    {
        title:'Danh sách ý kiến khách hàng'
    },
]
const pageSize=10;
export default function ManageMenu() {

    const [isLoading,setIsLoading] = useState(false)
    const [banners,setMenus] = useState([]);
    const [totalMenus,setTotalMenus]=useState(0)
    const [page,setPage]=useState(0);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const columns = [
        {
            title: "STT",
            align: "center",
            width: "50px",
            render: (text, record, index) => {
                return page * pageSize+ index + 1;
            },
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
            width: '2/12'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '2/12'
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
            width: '2/12'
        },
        {
            title: 'Nội dung',
            dataIndex: 'feedback',
            key: 'feedback',
            width: '6/12'
        },
    ]

    const headerAction = <HeaderAction>
    </HeaderAction>
    const fetchMenu =async ()=>{
        try{
            setIsLoading(true);
            const res=await manageFeedbacksApi.getAllFeedbacks(page);
            setMenus(res.data?.contacts);
            setTotalMenus(res.data?.pagination?.total);
        }catch (e) {
            console.log(e);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMenu().then();
    }, [page]);


    return (
        <LayoutPage>
            <HeaderPage title={"Quản lý ý kiến khách hàng"} breadScrum={breadScrum} action={headerAction}></HeaderPage>
            <Spin spinning={isLoading} className={'mt-[20px]'}>
                <Table columns={columns} dataSource={banners}
                       // rowSelection={rowSelection}
                       rowKey={'_id'} pagination={{
                    total:totalMenus,
                    size:pageSize,
                    onChange:((page)=>{setPage(page)})
                }}></Table>
            </Spin>
        </LayoutPage>
    );
}
