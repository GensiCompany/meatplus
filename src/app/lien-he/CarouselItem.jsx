import Image from "next/image";
import {Button} from "antd";
import classes from "./LienHe.module.css"
import {FaLocationDot} from "react-icons/fa6";
import { getImageLink } from "@/utils/common";

const CarouselItem=({item})=>{
    return <a href={`https://www.google.com/maps?saddr=Current+Location&daddr=${item?.lng},${item?.lat}`} target={'_blank'} className={`${classes.carouselItem} lien-he-item flex sm:flex-col gap-[10px] sm:gap-[0] flex-1`}>
        <Image src={getImageLink(item?.imageUrl)} alt={"anh location"} width={1920} height={1080} objectFit={'cover'} className={'w-[130px] sm:w-[226px] sm:h-[226px] xl:w-full xl:h-full object-cover lien-he-image'}></Image>
        <div className={`sm:px-[20px] sm:pt-[10px] sm:pb-[20px] uppercase sm:normal-case sm:text-center flex flex-col flex-1 w-full ${classes.text}`}>
            <p className={'text-[#555] sm:text-[var(--primary)] text-[16px] sm:text-[18px] my-[2px] font-[700]'}>{item?.name}</p>
            <p className={"text-[14px] font-[700] text-[#555] hidden sm:inline-block"}>ĐT: <span className={'font-[500]'}>{item?.phoneNumber}</span></p>
            <p className={"text-[14px] font-[700] text-[#777] normal-case mb-2"}><span className={'sm:hidden inline-block'}><FaLocationDot /></span> <span className={'hidden sm:inline-block'}>ĐC: </span><span className={'font-[500]'}>{item?.address}</span></p>
            <div className={'flex gap-[10px] justify-center mt-auto'}>
                <a href={item?.facebook_link} target={'_blank'}><Button type={'primary'}
                                                                        className={'rounded-0 '}>FANPAGE</Button></a>
                <a href={`https://www.google.com/maps?saddr=Current+Location&daddr=${item?.lng},${item?.lat}`}
                   target={'_blank'} ><Button type={'primary'} className={'rounded-0 sm:hidden flex-1'}>CHỈ ĐƯỜNG</Button></a>
            </div>
        </div>
    </a>
}

export default CarouselItem;