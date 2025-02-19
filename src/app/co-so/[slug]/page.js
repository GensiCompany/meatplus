import {headers} from "next/headers";
import locationApi from "@/app/api/fe/locationApi";
import DOMPurify from "isomorphic-dompurify";

const fetchDetailNews = async (id)=>{
    try{
        const res =await locationApi.getDetail(id);
        return res?.data?.retreast;
    }catch (e) {
        console.log(e);
    }
}
export async function generateMetadata() {
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");
    const array = pathname?.split("-");
    const data = await fetchDetailNews(array[array.length - 1]);

    return {
        title: data?.name || "Thông tin địa điểm",
        description: data?.name || "Khám phá thông tin chi tiết về địa điểm này.",
        openGraph: {
            title: data?.name || "Thông tin địa điểm",
            description: data?.name || "Khám phá thông tin chi tiết về địa điểm này.",
            images: [
                {
                    url: data?.imageUrl,
                    width: 1920,
                    height: 1080,
                    alt: data?.name,
                },
            ],
        },
    };
}
export default async function CMS (){
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");
    const array = pathname?.split("-");
    const data = await fetchDetailNews(array[array.length - 1]);
    return <div  className={'w-full flex justify-center pt-[20px]'}>
        <div className={'max-w-[1170px] w-full'}>
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data?.promotionContent)}} className={'w-full'}/>
        </div>
    </div>
}