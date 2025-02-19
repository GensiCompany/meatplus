'use client';

import {Button, notification, Popconfirm, Spin, Table} from "antd";
import HeaderPage from "@/components/cms/headerPage/HeaderPage";
import LayoutPage from "@/components/cms/LayoutPage";
import HeaderAction from "@/components/cms/headerPage/HeaderAction";
import React, {useContext, useEffect, useMemo, useState} from "react";
import CreateSectionModal from "@/app/cms/manageSection/components/CreateSectionModal";
import manageSectionApi from "@/app/api/cms/manageSectionApi";
import {FaTrash} from "react-icons/fa";
import {MdEdit} from "react-icons/md";
import EditSectionModal from "@/app/cms/manageSection/components/EditSectionModal";
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {GiHamburgerMenu} from "react-icons/gi";

const breadScrum = [
    {
        title:'Quản lý trang chủ'
    },
    {
        title:'Quản lý Section'
    },
    {
        title:'Danh sách Section'
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
    const [pageSize,setPageSize]=useState(100);
    const [banners,setSections] = useState([]);
    const [totalSections,setTotalSections]=useState(0)
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
            const res = await manageSectionApi.deleteSectionAll({ids:ids});
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
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            width: '2/12'
        },
        {
            title: 'Hiệu ứng xuất hiện',
            dataIndex: 'appearTransition',
            key: 'appearTransition',
            width: '2/12'
        },
        {
            title: 'Loại',
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
                    setSelectedSection(record)
                    setIsShowEditModal(true)
                }}>Sửa</Button>
                <Popconfirm
                    placement="topLeft"
                    title={"Bạn có chắc mun xóa Section này"}
                    description={"Không thể hoàn tác sau khi xóa"}
                    okText="Xóa"
                    cancelText="Hủy"
                    onConfirm={()=>deleteSection([record?._id])}
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
            title={"Bạn có chắc mun xóa Section này"}
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
            const res=await manageSectionApi.getAllSection(page,pageSize);
            setSections(res.data?.sections);
            setTotalSections(res.data?.pagination?.total);
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

    const onDragEnd = async({ active, over }) => {
        if (active.id !== over?.id) {
            console.log(active,over)
            await manageSectionApi.editSection([{_id:active.id,order:over?.data?.current?.sortable?.index}])
            await manageSectionApi.editSection([{_id:over.id,order:active?.data?.current?.sortable?.index}])
            fetchSection().then()
            setSections((prevState) => {
                const activeIndex = prevState.findIndex((record) => record.key === active?.id);
                const overIndex = prevState.findIndex((record) => record.key === over?.id);
                return arrayMove(prevState, activeIndex, overIndex);
            });
        }
    };
    const onShowSizeChange = (current, pageSize) => {
        setPageSize(pageSize);
    };
    return (
        <LayoutPage>
            {contextHolder}
            <CreateSectionModal total={totalSections} isShowCreateModal={isShowCreateModal} setIsShowCreateModal={setIsShowCreateModal} refresh={()=>{fetchSection().then();
                setSelectedSection(null)}}
            ></CreateSectionModal>
            {isShowEditModal&&<EditSectionModal isShowCreateModal={isShowEditModal} setIsShowCreateModal={setIsShowEditModal}
                                               data={selectedSection} refresh={() => {
                fetchSection().then();
                setSelectedSection(null)
            }} setSelectedSection={setSelectedSection}
            ></EditSectionModal>}

            <HeaderPage title={"Quản lý Section"} breadScrum={breadScrum} action={headerAction}></HeaderPage>
            <Spin spinning={isLoading} className={'mt-[20px]'}>
                <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                    <SortableContext items={banners.map((i) => i._id)} strategy={verticalListSortingStrategy}>
                        <Table columns={columns} dataSource={banners} rowSelection={rowSelection} components={{
                            body: {
                                row: Row,
                            },
                        }} rowKey={'_id'} pagination={{
                            total:totalSections,
                            showSizeChanger:false,
                            onShowSizeChange:onShowSizeChange,
                            defaultPageSize:pageSize,
                            size:pageSize,
                            onChange:((page)=>{setPage(page)})
                        }}></Table>
                    </SortableContext>
                </DndContext>

            </Spin>
        </LayoutPage>
    );
}
