'use client';

import classes from "./LienHe.module.css";
import {useEffect, useState} from "react";

const Maps= ({data})=>{
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const [selectedLocation,setSelectedLocation] = useState();
    
    useEffect(() => {
        if (data && data.length > 0) {
            setSelectedLocation({
                map: data[0]?.map,
                id: data[0]?._id
            })
        }
    }, [])

    return <div className={'h-[450px] flex justify-center mt-[20px]'}>
        <div className={'h-full max-w-[1170px] w-full flex flex-col sm:flex-row px-[10px] sm:px-0'}>
            <div className={'h-full overflow-y-auto text-[#777] flex-2 sm:flex-1'}>
                <p className={'px-[10px] py-[6px]'}>Tìm thấy <span className={'font-[700]'}>{data?.length}</span> cửa hàng</p>
                <div>
                    {data?.map((item, i) => (<div key={i} className={`px-[10px] [pt-[10px] pb-[14px] ${classes.location} ${selectedLocation?.id===item?._id?classes.active:""}`} onClick={()=>{setSelectedLocation({
                        map:item?.map,
                        id:item?._id
                    })}}>
                        <p className={'font-[700]'}>{item?.name}</p>
                        <p className={'mb-[6px]'}>{item?.address}</p>
                        <a href={`https://www.google.com/maps?saddr=Current+Location&daddr=${item?.lng},${item?.lat}`}
                           target={'_blank'} className={`mt-[10px] text-[#334862] ${classes.point}`}>Chỉ đường</a>
                    </div>))}
                </div>
            </div>
            <div className={`h-full flex-1 ${classes.iframeContainer}`}>
                <div dangerouslySetInnerHTML={{__html: selectedLocation?.map}} className={'w-full'}/>
            </div>
        </div>
    </div>
}

export default Maps;