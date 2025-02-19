import newsApi from "@/app/api/fe/newsApi";
import {headers} from "next/headers";
import LatestNews from "@/components/fe/news/LatestNews";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";

import Comment from "@/components/fe/news/Comment";
import Share from "@/components/fe/news/Share";
import {MdArrowForwardIos, MdOutlineArrowBackIos} from "react-icons/md";
import {createUrlFriendly} from "@/utils/common";
import { getImageLink } from "@/utils/common";

const fetchDetailNews = async (id)=>{
    try{
        const res =await newsApi.getDetail(id);
        return res?.data["_new"];
    }catch (e) {
        console.log(e);
    }
}

export async function generateMetadata({ params }) {
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");
    const array = pathname?.split("-");
    const id = array[array.length - 1];
    const data = await fetchDetailNews(id);

    return {
        title: data?.name || "Tin tức",
        description: data?.shortDescription || "Thông tin chi tiết bài viết",
        openGraph: {
            title: data?.name || "Tin tức",
            description: data?.shortDescription || "Thông tin chi tiết bài viết",
        },
        twitter: {
            card: "summary_large_image",
            title: data?.name || "Tin tức",
            description: data?.shortDescription || "Thông tin chi tiết bài viết",
            images: [data?.imageUrl || "https://yourwebsite.com/default-image.jpg"],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function CMS() {
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");
    const array = pathname?.split("-");
    const data = await fetchDetailNews(array[array.length - 1]);
    const createdDate=new Date(data?.createdAt)
    const sanitizedHtml = DOMPurify.sanitize(data?.content);
    const otherNews = await newsApi.getAll(1,5);
    const otherNewsData=otherNews?.data?.news;

    const filteredNews = otherNewsData?.filter(news => news._id !== data._id);

    const randomNews = [];
    while (randomNews.length < 2 && filteredNews.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredNews.length);
        randomNews.push(filteredNews[randomIndex]);
        filteredNews.splice(randomIndex, 1);
    }

    const hasTwoNews = randomNews.length === 2;

    return <div className={'w-full flex justify-center'}>
        <div className={'flex flex-col md:flex-row justify-center gap-[10px] sm:gap-0  w-full max-w-[1200px] py-[30px]'}>
            <div className={'px-[10px] md:px-[30px] w-full  md:w-3/4'}>
                <div className={'relative'}>
                    <Image src={getImageLink(data?.imageUrl)} alt={"anh tin tuc"} width={1920} height={1080}
                           className={'w-full object-cover'}></Image>
                    <div
                        className={'absolute top-[20px] left-0 bg-[#f9e20a] w-[45px] h-[45px] flex flex-col text-white items-center justify-center font-[600]'}>
                        <p className={'leading-[1] '}>{createdDate?.getDate()}</p>
                        <p className={'leading-[1] text-[12px]'}>th{createdDate?.getMonth() + 1}</p>
                    </div>
                </div>

                <a href={"/category/tin-tuc"} className={"mt-[24px] text-[#334862] text-[12px] font-[700]"}>Tin tức</a>
                <p className={'text-[28px] text-[#555] font-[700]'}>{data?.name}</p>
                <div className={"bg-[rgba(0,0,0,.1)] h-[3px] w-[30px] my-[16px]"}></div>
                <p className={'text-[12px] text-[#777]'}>Đăng vào <span
                    className={'text-black'}>{createdDate?.getDate() + "/" + createdDate.getMonth() + 1 + "/" + createdDate.getFullYear()}</span> bởi <span
                    className={'text-black'}>{data?.createdBy?.fullname}</span>
                </p>
                <div className={'pt-[24px]'}>
                    <div dangerouslySetInnerHTML={{__html: sanitizedHtml}}/>
                </div>
                <Share></Share>

                {randomNews?.length > 0 && (
                    <div className={'border-[1px] border-[#c0c0c0] border-r-0 border-l-0 mt-[15px] flex items-center'}>
                        <div className={'px-[10px] py-[25px] border-[1px] border-t-0 border-b-0 border-l-0 border-[#c0c0c0] w-1/2 cursor-pointer'}>
                            <a href={`/category/tin-tuc/${createUrlFriendly(randomNews[0]?.name + "-" + randomNews[0]["_id"])}`} className={'flex gap-[10px] items-center'}>
                                <MdOutlineArrowBackIos size={22} className={'w-1/5 sm:w-1/8'}/>
                                <p className={'w-4/5 sm:w-7/8'}>{randomNews[0]?.name}</p>
                            </a>
                        </div>
                        {
                            hasTwoNews &&
                            <div className={'px-[10px] py-[25px] w-1/2 cursor-pointer'}>
                                <a href={`/category/tin-tuc/${createUrlFriendly(randomNews[1]?.name + "-" + randomNews[1]["_id"])}`} className={'flex gap-[10px] items-center'}>
                                    <p className={'w-4/5 sm:w-7/8'}>{randomNews[1]?.name}</p>
                                    <MdArrowForwardIos size={22} className={'w-1/5 sm:w-1/8'}/>
                                </a>
                            </div>
                        }
                    </div>
                )}
                <Comment></Comment>
            </div>
            <LatestNews></LatestNews>
        </div>
    </div>
}
