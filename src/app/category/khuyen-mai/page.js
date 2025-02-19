import LayoutNews from "@/components/fe/news/LayoutNews";
import promotionApi from "@/app/api/fe/promotionApi";

const pageSize=10;
export const metadata={
    title:"Lưu trữ Khuyến mại - Meat Plus Việt Nam",
    robots: {
        index: true,
        follow: true,
    },
}
const fetchNews = async (page,search)=>{
    try{
        const res =await promotionApi.getAll(page,pageSize,search);
        return ({items:res?.data?.discounts,total:res?.data?.pagination?.total})
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
    return <LayoutNews news={data?.items} page={page} pageSize={pageSize} url={'khuyen-mai'} total={data?.total}></LayoutNews>
}