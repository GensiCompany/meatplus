'use client';

import {FaPhone} from "react-icons/fa";
import {useEffect, useState} from "react";
import {FaXmark} from "react-icons/fa6";
import locationApi from "@/app/api/fe/locationApi";

const ListPhone =()=>{
    const [isOpenList,setIsOpenList] = useState(false);
    const [listLocation,setListLocation] = useState([])
    useEffect(() => {
        const fetchLocations= async ()=>{
            try{
                const res = await locationApi.getAll();
                setListLocation(res?.data?.retreasts);
            }
            catch (e){
                console.log(e)
            }
        }

        fetchLocations().then();
    }, []);

    return <div
        className={'w-[60px] relative z-10 h-[60px] sm:w-[70px] sm:h-[70px] rounded-[50%] bg-[#9C1417] flex justify-center items-center'}>
        <div className={' w-[40px] h-[40px] rounded-[50%] bg-white flex justify-center items-center'} onClick={()=>{setIsOpenList(prev=>!prev)}}>
            {!isOpenList && <FaPhone size={26} color={'var(--primary)'}/>}
            {isOpenList && <FaXmark  size={26} color={'var(--primary)'}/>}
        </div>
        {isOpenList && <div
            className={'absolute w-[65vw] md:w-[300px] h-[500px] top-[-520px] left-0 rounded-[10px] z-[1000] bg-white px-[10px] py-[15px] shadow-xl'}>
            <div
                className={'w-full h-full flex flex-col gap-[12px] overflow-y-auto bg-white'}>
                {
                    listLocation?.map((location, i) => <a key={i} href={`tel:${location?.phoneNumber}`}
                                                          className={'flex  gap-[10px] items-center '}>
                        <div
                            className={' w-[40px] h-[40px] rounded-[50%] bg-[#9C1417] text-white flex justify-center items-center'}>
                            <FaPhone size={26}/>
                        </div>
                        <p className={'text-[15px]'}>{location?.name}</p>
                    </a>)
                }
            </div>
            <div className={'arrow-down'}></div>
        </div>}
    </div>
}

export default ListPhone;