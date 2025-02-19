import Image from "next/image";
import BannerLienHe from "@/assets/images/bannerLienhe.jpg";
import classes from "./LienHe.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {CiGift} from "react-icons/ci";
import LienHeCarousel from "@/app/lien-he/LienHeCarousel";
import Maps from "@/app/lien-he/Maps";
import locationApi from "@/app/api/fe/locationApi";
import websiteInfoApi from "@/app/api/fe/websiteInfoApi";

const fetchLocations = async ()=>{
    try{
        const res = await locationApi.getAll();
        return res?.data?.retreasts;
    }
    catch (e) {
        console.log(e)
    }
}

const fetchSetting = async ()=>{
    try{
        const res=await websiteInfoApi.getWebsiteInfo();
        return res?.data?.setting;
    }
    catch (e) {
        console.log(e)
    }
}
export const metadata={
    title:"Liên hệ - Meat Plus Việt Nam",
    description:"ĐT: 034.261.1212ĐC: 55 & 55A Nguyễn Đăng Giai, Thảo Điền, Quận 2, TP Hồ Chí Minh",
    robots: {
        index: true,
        follow: true,
    },
}
export default async function CMS() {
    const data = await fetchLocations();
    const setting = await fetchSetting();
    return <div>
        <Image src={BannerLienHe} className={'w-full'} alt={'banner lien he'}></Image>
        <div className={'w-full flex justify-center py-[30px]'}>
            <div className={'flex gap-[10px] items-center w-full max-w-[1170px] justify-center mb-[24px]'}>
                <div className={classes.line}></div>
                <div className={classes.title}><CiGift size={24} className={'inline-block'}/>
                    <span>Thông tin Khuyến Mãi</span></div>
                <div className={classes.line}></div>
            </div>
        </div>
        <LienHeCarousel data={data}></LienHeCarousel>
        <Maps data={data}></Maps>

        <div className={'w-full flex justify-center py-[30px]'}>
            <div className={'flex gap-[10px] items-center w-full max-w-[1170px] mb-[24px]'}>
                <div className={'w-full px-[10px] sm:px-[0] sm:w-1/2 text-[#777]'}>
                    <p className={'uppercase text-[28px] font-[700] text-black mb-[10px]'}>Liên Hệ</p>
                    <p className={'mb-[15px] leading-[26px]'}>Chúng tôi luôn trân trọng mọi ý kiến của quý khách, ý kiến từ quý khách sẽ giúp chúng tôi nâng
                        cao về
                        chất lượng phục vụ chính quý khách cũng góp phần vào sự thành công và phát triển thương hiệu
                        Meat
                        Plus
                        của chúng tôi:</p>
                    <p className={'mb-[15px]'}>Giuseart rất hoan nghênh độc giả gửi thông tin và góp ý cho chúng tôi!</p>
                    <p className={'font-[700] leading-[26px]'}>Địa chỉ: {setting?.address}<span></span></p>
                    <p className={'font-[700] leading-[26px]'}>Email: {setting?.email}<span></span></p>
                    <p className={'font-[700] leading-[26px]'}>SĐT: {setting?.phoneNumber}<span></span></p>
                    <p className={'font-[700] leading-[26px]'}>Website: {setting?.Website}<span></span></p>
                </div>
            </div>
        </div>
    </div>
}
