import LayoutNews from "@/components/fe/news/LayoutNews";
import newsApi from "@/app/api/fe/newsApi";

const pageSize=10;

export const metadata={
    title:"Lưu trữ Tin tức - Meat Plus Việt Nam",
    robots: {
        index: true,
        follow: true,
    },
}
const fetchNews = async (page,search)=>{
    try{
        const res =await newsApi.getAll(page,pageSize,search);
        return ({items:res?.data?.news,total:res?.data?.pagination?.total})
    }catch (e) {
        console.log(e);
    }
}
export default async function CMS({searchParams }) {
    let page = 1;
    const params = await searchParams;
    if (params?.page) {
        page = params?.page;
    }

    const data = await fetchNews(page,params?.search||"");
    return <LayoutNews news={data?.items} page={page} pageSize={pageSize} url={'tin-tuc'} total={data?.total}></LayoutNews>
}