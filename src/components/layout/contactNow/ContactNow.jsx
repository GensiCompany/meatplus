import {headers} from "next/headers";
import CmsRouteList from "@/utils/cmsRouteList";
import ListPhone from "@/components/layout/contactNow/ListPhone";
import WebsiteInfoApi from "@/app/api/fe/websiteInfoApi";
async function fetchDefaultData() {
    const res = await WebsiteInfoApi.getWebsiteInfo();
    return res?.data?.setting;
}
const ContactNow = async ()=>{
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");
    const data=await fetchDefaultData();
    return <div style={CmsRouteList.some(x=>pathname?.startsWith(x))?{display:'none'}:{}} className={'fixed bottom-[30px] left-[30px] flex items-center z-[1000]'}>
            <ListPhone></ListPhone>
        <a href={"tel:"+data?.hotline}
            className={'relative h-[40px] translate-x-[-55px] border-[2px] border-white rounded-[30px] pl-[60px] pr-[20px] bg-[var(--primary)] text-white font-[700] flex items-center justify-end'}>
                <p>LIÊN HỆ ĐẶT BÀN</p>
            </a>
    </div>
}
export default ContactNow;