'use client';

import {Button, notification, Popconfirm, Spin, Table} from "antd";
import HeaderPage from "@/components/cms/headerPage/HeaderPage";
import LayoutPage from "@/components/cms/LayoutPage";
import HeaderAction from "@/components/cms/headerPage/HeaderAction";
import React, {useEffect, useState} from "react";
import CreateMenuModal from "@/app/cms/manageMenu/components/CreateMenuModal";
import manageMenuApi from "@/app/api/cms/manageMenuApi";
import {FaTrash} from "react-icons/fa";
import {MdEdit} from "react-icons/md";
import EditMenuModal from "@/app/cms/manageMenu/components/EditMenuModal";

const breadScrum = [
    {
        title:'Quản lý hệ thống'
    },
    {
        title:'Quản lý Menu'
    },
    {
        title:'Danh sách Menu'
    },
]
const pageSize=10;
export default function ManageMenu() {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, title, content) => {
        api[type]({
            message: title,
            description:content,
            placement:'bottomRight'
        });
    };
    const [isShowCreateModal,setIsShowCreateModal] = useState(false);
    const [isShowEditModal,setIsShowEditModal] = useState(false);
    const [isLoading,setIsLoading] = useState(false)
    const [banners,setMenus] = useState([]);
    const [totalMenus,setTotalMenus]=useState(0)
    const [page,setPage]=useState(1);

    const [selectedMenu,setSelectedMenu] = useState()
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const deleteMenu=async (ids)=>{
        try{
            setIsLoading(true)
            const res = await manageMenuApi.deleteMenuAll({ids:ids});
            openNotificationWithIcon("success","Thông báo","Xóa Menu thành công");
            fetchMenu().then()
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setIsLoading(false)
        }
    }

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
            title: 'Menu',
            dataIndex: 'name',
            key: 'name',
            width: '2/12'
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            width: '2/12'
        },
        {
            title: 'Loại menu',
            dataIndex: 'type',
            key: 'type',
            width: '2/12'
        },
        {
            title: '',
            key: 'func',
            width: 100,
            render: (data,record) => <div className='flex gap-[10px] items-center'>
                <Button type={'primary'} icon={ <MdEdit />} onClick={()=>{
                    setSelectedMenu(record)
                    setIsShowEditModal(true)
                }}>Sửa</Button>
                <Popconfirm
                    placement="topLeft"
                    title={"Bạn có chắc muốn xóa Menu này"}
                    description={"Không thể hoàn tác sau khi xóa"}
                    okText="Xóa"
                    cancelText="Hủy"
                    onConfirm={()=>deleteMenu([record?._id])}
                >
                    <Button icon={<FaTrash />} danger onClick={()=>{}}>Xóa</Button>
                </Popconfirm>
            </div>,
        },

    ]

    const headerAction = <HeaderAction>
        <Button type='primary' onClick={()=>{setIsShowCreateModal(true)}}>Thêm mới</Button>
        <Popconfirm
            placement="topLeft"
            title={"Bạn có chắc muốn xóa Menu này"}
            description={"Không thể hoàn tác sau khi xóa"}
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={()=> {
                deleteMenu(selectedRowKeys).then()
                setSelectedRowKeys([])
            }}
        >
            <Button color="danger" variant="solid" >Xóa</Button>
        </Popconfirm>
    </HeaderAction>
    const fetchMenu =async ()=>{
        try{
            setIsLoading(true);
            const res=await manageMenuApi.getAllMenu(page);
            setMenus(res.data?.menus);
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
            {contextHolder}
            <CreateMenuModal isShowCreateModal={isShowCreateModal} setIsShowCreateModal={setIsShowCreateModal} refresh={()=>{fetchMenu().then();
            setSelectedMenu(null)}}
            ></CreateMenuModal>
            {isShowEditModal&&<EditMenuModal isShowCreateModal={isShowEditModal} setIsShowCreateModal={setIsShowEditModal}
                              data={selectedMenu} refresh={() => {
                fetchMenu().then();
                setSelectedMenu(null)
            }} setSelectedMenu={setSelectedMenu}
            ></EditMenuModal>}

            <HeaderPage title={"Quản lý Menu"} breadScrum={breadScrum} action={headerAction}></HeaderPage>
            <Spin spinning={isLoading} className={'mt-[20px]'}>
                <Table columns={columns} dataSource={banners} rowSelection={rowSelection} rowKey={'_id'} pagination={{
                    total:totalMenus,
                    size:pageSize,
                    onChange:((page)=>{setPage(page)})
                }}></Table>

            </Spin>
        </LayoutPage>
    );
}
