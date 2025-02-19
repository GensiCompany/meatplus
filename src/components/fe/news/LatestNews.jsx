import {IoSearch} from "react-icons/io5";
import {Input} from "antd";
import {createUrlFriendly, getImageLink} from "@/utils/common";
import Image from "next/image";
import classes from "./LayoutNews.module.css";
import newsApi from "@/app/api/fe/newsApi";
import SearchBox from "@/components/fe/news/Search";

const fetchNews=async ()=>{
    try{
        const res =await newsApi.getAll(1,5);
        return res?.data?.news;
    }
    catch (e) {
        console.log(e)
    }
}

const LatestNews  =async ()=>{
    const items=await fetchNews();
    return <div className={'px-[10px] md:px-[30px] w-full md:w-1/4'} style={{borderLeft:'1px solid #ececec;'}}>
        <SearchBox></SearchBox>

        <div>
            <p className={"text-[#555] font-[700] mt-[30px]"}>BÀI VIẾT MỚI</p>
            <div className={"bg-[rgba(0,0,0,.1)] h-[2px] w-[30px] my-[8px]"}></div>
            {
                items?.map((item,i)=><a href={`/category/tin-tuc/${createUrlFriendly(item?.name+"-"+item["_id"])}`} key={i} className={`flex gap-[10px] ${classes.latestNews}`}>
                    <Image src={getImageLink(item?.imageUrl)} alt={"anh news"} width={1920} height={1080} objectFit={'cover'} className={'w-[45px] h-[45px] object-cover'}></Image>
                    <p className={`text-[15px] ${classes.otherNewsTitle} `}>{item?.name}</p>
                </a>)
            }
        </div>
    </div>
}

export default LatestNews;