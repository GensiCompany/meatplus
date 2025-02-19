'use client';

import Link from "next/link";
import Image from "next/image";
import classes from "./SectionWrapper.module.css"
import Slider from "@/components/fe/common/slider/Slider";

const SectionSlide = ({title,items,data})=>{

    const renderItem=(item,i,gap)=>{
        return <div className={`${gap?`px-[10px]`:""}`}>
            {item?.link?<Link className={`${classes.sectionItem} ${classes.multiple}`} key={i} href={item?.link}>
                <Image key={i} src={item?.imageUrl} alt={"menu"} width={1920} height={1080} objectFit={'cover'}></Image>
            </Link>:<Image className={`${classes.sectionItem} ${classes.multiple}`} key={i} src={item?.imageUrl} alt={"menu"} width={1920} height={1080} objectFit={'cover'}></Image>}
        </div>
    }
    return <div className={`${classes.sectionContainer} homeSection ${data?.appearTransition}`}>
        <p className={'promo-title'}>{title}</p>
        {items?.length>3 ? <div className={'w-full'}>
            <Slider items={items?.map((item,i)=>renderItem(item,i,10))}  options={{
                slidesToShow:3,
                autoplay:true,
                autoplaySpeed:2000,
                infinite:true,
                responsive: [
                    {breakpoint: 480, settings: {slidesToShow: 1}}
                ]
            }}></Slider>
        </div> :<div className={classes.section}>
            {items?.map((item,i)=>renderItem(item,i))}
        </div>}
    </div>
}

export default SectionSlide;