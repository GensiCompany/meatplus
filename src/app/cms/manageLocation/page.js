'use client';

import {Button, notification, Popconfirm, Spin, Table} from "antd";
import HeaderPage from "@/components/cms/headerPage/HeaderPage";
import LayoutPage from "@/components/cms/LayoutPage";
import HeaderAction from "@/components/cms/headerPage/HeaderAction";
import React, {useContext, useEffect, useMemo, useState} from "react";
import CreateLocationModal from "@/app/cms/manageLocation/components/CreateLocationModal";
import manageLocationApi from "@/app/api/cms/manageLocationApi";
import {FaTrash} from "react-icons/fa";
import {MdEdit} from "react-icons/md";
import EditSectionModal from "@/app/cms/manageLocation/components/EditLocationModal";
import {DndContext} from "@dnd-kit/core";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {arrayMove, SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {GiHamburgerMenu} from "react-icons/gi";
import manageSectionApi from "@/app/api/cms/manageSectionApi";

const breadScrum = [
    {
        title:'Quản lý trang chủ'
    },
    {
        title:'Quản lý cơ sở'
    },
    {
        title:'Danh sách cơ sở'
    },
]

const RowContext = React.createContext({});
const DragHandle = () => {
    const { setActivatorNodeRef, listeners } = useContext(RowContext);
    return (
        <Button
            type="text"
            size="small"
            icon={<GiHamburgerMenu />}
            style={{
                cursor: 'move',
            }}
            ref={setActivatorNodeRef}
            {...listeners}
        />
    );
};
const Row = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props['data-row-key'],
    });
    const style = {
        ...props.style,
        transform: CSS.Translate.toString(transform),
        transition,
        ...(isDragging
            ? {
                position: 'relative',
                zIndex: 9999,
            }
            : {}),
    };
    const contextValue = useMemo(
        () => ({
            setActivatorNodeRef,
            listeners,
        }),
        [setActivatorNodeRef, listeners],
    );
    return (
        <RowContext.Provider value={contextValue}>
            <tr {...props} ref={setNodeRef} style={style} {...attributes} />
        </RowContext.Provider>
    );
};
export default function Login() {
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
    const [locations,setLocation] = useState([]);
    const [pageSize,setPageSize]=useState(100);

    const [totalLocation,setTotalLocation]=useState(0)
    const [page,setPage]=useState(1);

    const [selectedSection,setSelectedSection] = useState()
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const deleteSection=async (ids)=>{
        try{
            setIsLoading(true)
            const res = await manageLocationApi.deleteLocationAll({ids:ids});
            openNotificationWithIcon("success","Thông báo","Xóa Section thành công");
            fetchSection().then()
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
            key: 'sort',
            align: 'center',
            width: 80,
            render: () => <DragHandle />,
        },
        {
            title: "STT",
            align: "center",
            width: "50px",
            render: (text, record, index) => {
                return (page-1) * pageSize+ index + 1;
            },
        },
        {
            title: 'Tên cơ sở',
            dataIndex: 'name',
            key: 'title'
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Facebook',
            dataIndex: 'facebook_link',
            key: 'facebook_link'
        },
        {
            title: 'Hotline',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        },
        {
            title: '',
            key: 'func',
            width: 100,
            render: (data,record) => <div className='flex gap-[10px] items-center'>
                <Button type={'primary'} icon={ <MdEdit />} onClick={()=>{
                    setSelectedSection(record)
                    setIsShowEditModal(true)
                }}>Sửa</Button>
                <Popconfirm
                    placement="topLeft"
                    title={"Bạn có chắc mun xóa cơ sở này"}
                    description={"Không thể hoàn tác sau khi xóa"}
                    okText="Xóa"
                    cancelText="Hủy"
                    onConfirm={()=>deleteSection([record["_id"]])}
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
            title={"Bạn có chắc muốn xóa cơ sở này"}
            description={"Không thể hoàn tác sau khi xóa"}
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={()=> {
                deleteSection(selectedRowKeys).then()
                setSelectedRowKeys([])
            }}
        >
            <Button color="danger" variant="solid" >Xóa</Button>
        </Popconfirm>
    </HeaderAction>
    const fetchSection =async ()=>{
        try{
            setIsLoading(true);
            const res=await manageLocationApi.getAllLocation(page,pageSize);
            setLocation(res.data?.retreasts);
            setTotalLocation(res.data?.pagination?.total);
        }catch (e) {
            console.log(e);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchSection().then();
    }, [page,pageSize]);
    const onShowSizeChange = (current, pageSize) => {
        setPageSize(pageSize);
    };
    const onDragEnd = async({ active, over }) => {
        if (active.id !== over?.id) {
            await manageLocationApi.editLocation(active.id,{_id:active.id,order:over?.data?.current?.sortable?.index})
            await manageLocationApi.editLocation(over.id,{_id:over.id,order:active?.data?.current?.sortable?.index})
            fetchSection().then()
            setLocation((prevState) => {
                const activeIndex = prevState.findIndex((record) => record.key === active?.id);
                const overIndex = prevState.findIndex((record) => record.key === over?.id);
                return arrayMove(prevState, activeIndex, overIndex);
            });
        }
    };
    return (
        <LayoutPage>
            {contextHolder}
            <CreateLocationModal isShowCreateModal={isShowCreateModal} setIsShowCreateModal={setIsShowCreateModal} refresh={()=>{fetchSection().then();
                setSelectedSection(null)}} total={totalLocation}
            ></CreateLocationModal>
            {isShowEditModal&&<EditSectionModal isShowCreateModal={isShowEditModal} setIsShowCreateModal={setIsShowEditModal}
                                                data={selectedSection} refresh={() => {
                fetchSection().then();
                setSelectedSection(null)
            }} setSelectedSection={setSelectedSection}
            ></EditSectionModal>}

            <HeaderPage title={"Quản lý cơ sở"} breadScrum={breadScrum} action={headerAction}></HeaderPage>
            <Spin spinning={isLoading} className={'mt-[20px]'}>
                <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                    <SortableContext items={locations.map((i) => i._id)} strategy={verticalListSortingStrategy}>
                        <Table columns={columns} dataSource={locations} rowSelection={rowSelection} components={{
                            body: {
                                row: Row,
                            },
                        }} rowKey={'_id'} pagination={{
                            total:totalLocation,
                            showSizeChanger:false,
                            onShowSizeChange:onShowSizeChange,
                            size:pageSize,
                            defaultPageSize:pageSize,
                            onChange:((page)=>{setPage(page)})
                        }}></Table>
                    </SortableContext>
                </DndContext>
            </Spin>
        </LayoutPage>
    );
}
