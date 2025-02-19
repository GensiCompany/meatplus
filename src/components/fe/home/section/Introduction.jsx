import IntroductionImage from "@/assets/images/introduction.jpg"
import Image from "next/image";
import classes from "./Introduction.module.css"
import Location from "@/components/fe/home/section/Location";
import WebsiteInfoApi from "@/app/api/fe/websiteInfoApi";

async function fetchDefaultData() {
    const res = await WebsiteInfoApi.getWebsiteInfo();
    return res?.data?.setting;
}

const Introduction =async ()=>{
    const defaultData = await fetchDefaultData();

    return <div className={'w-full flex flex-col gap-[30px]'}>
        <div className={`flex w-full gap-[20px] flex-wrap sm:flex-nowrap homeSection BOTTOM_TO_TOP`}>
            <Image src={IntroductionImage} alt={"introduction image"}
                   className='w-full sm:w-1/2 sm:h-[330px] object-cover'></Image>
            <div className='flex flex-col w-full sm:w-1/2'>
                <p className={classes.title}>MEAT PLUS</p>
                <p className={classes.content}>{defaultData?.introduction}</p>
                <p className={classes.pass}>Tư vấn nhượng quyền: <span className={classes.phone}>{defaultData?.phone_nhuong_quyen}</span></p>
            </div>
        </div>
        <Location></Location>
    </div>

}

export default Introduction;