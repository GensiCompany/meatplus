'use client';

import {Pagination} from "antd";
import {useEffect, useState} from "react";

const PaginationCustom = ({page,pageSize,url,total})=>{
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => {
        setIsHydrated(true);
    }, []);
    return <>
    {isHydrated && <Pagination size={pageSize} current={page} total={total} onChange={(page)=>{
        window.location.href=url+"?page="+page;
    }} align={'center'}></Pagination>}
    </>
}

export default PaginationCustom;