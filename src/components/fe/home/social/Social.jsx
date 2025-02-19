import { IoLocationSharp } from "react-icons/io5";
import FbIcon from "@/assets/images/fbIcon.png";
import YtbIcon from "@/assets/images/ytbIcon.png";
import InstagramIcon from "@/assets/images/instagramIcon.png";
import Image from "next/image";
import classes from "./social.module.css"
import Link from "next/link";
import WebsiteInfoApi from "@/app/api/fe/websiteInfoApi";

async function fetchDefaultData() {
  const res = await WebsiteInfoApi.getWebsiteInfo();
  return res?.data?.setting;
}

const Social =async () => {
  const data=await fetchDefaultData();

  return <div className={classes.container}>
    <a href={"/lien-he"} className={`${classes.title} `}>
      <IoLocationSharp size={40}/>
      <p>
        HỆ THỐNG CỬA HÀNG MEAT PLUS
      </p>
    </a>
    <div className='flex justify-center gap-[26px] flex-wrap'>
      <a href={`${data?.facebook}`} target={"_blank"}>
        <Image src={FbIcon.src} alt={"facebook icon"} width={70} height={70} objectFit={'cover'}
               className='w-[70px] h-[70px]'></Image>
      </a>
      <a href={`${data?.youtube}`} target={"_blank"}>
        <Image src={YtbIcon.src} alt={"youtube icon"} width={70} height={70} objectFit={'cover'}
               className='w-[70px] h-[70px]'></Image>
      </a>
      <a href={`${data?.instagram}`} target={"_blank"}>
        <Image src={InstagramIcon.src} alt={"instagram icon"} width={70} height={70} objectFit={'cover'}
               className='w-[70px] h-[70px]'></Image>
      </a>
    </div>
  </div>
}

export default Social;