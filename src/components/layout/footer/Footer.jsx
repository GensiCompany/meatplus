import {headers} from "next/headers";
import CmsRouteList from "@/utils/cmsRouteList";
import {FaFacebookF, FaTwitter} from "react-icons/fa";
import {IoLogoInstagram, IoMdMail} from "react-icons/io";
import CtyLogo from "@/assets/images/logo-laguna.png"
import FooterLogo1 from "@/assets/images/footer-1.png"
import FooterLogo2 from "@/assets/images/footer-2.png"
import FooterLogo3 from "@/assets/images/footer-3.png"
import FooterLogo4 from "@/assets/images/footer-4.png"
import FooterLogo5 from "@/assets/images/footer-5.png"
import classes from "./Footer.module.css"
import Image from "next/image";
import WebsiteInfoApi from "@/app/api/fe/websiteInfoApi";

async function fetchDefaultData() {
    const res = await WebsiteInfoApi.getWebsiteInfo();
    return res?.data?.setting;
}

const Footer =async ()=>{
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");

    const defaultData = await fetchDefaultData();

    return <footer style={CmsRouteList.some(x=>pathname?.startsWith(x))?{display:'none'}:{}} className={'bg-[#191919]  w-full flex justify-center py-[30px] overflow-hidden'}>
        <div className={'max-w-[1170px]'}>
            <div className='flex gap-[30px] flex-col sm:flex-row px-[10px] sm:p-0 '>
                <Image src={CtyLogo} alt={"laguna logo"} className={'w-full sm:w-[162px] sm:h-[162px] lg:w-[262.5px] lg:h-[262.5px] object-cover'}></Image>
                <div className={'text-white w-full sm:w-4/12 md:w-5/12'}>
                    <p className={'text-[18px] font-[700] '}>CÔNG TY TNHH LAGUNA BEACH</p>
                    <p className={'font-[700] text-[16px]'}>Địa chỉ: <span className={'font-[400]'}>{defaultData?.address}.</span>
                    </p>
                    <p className={'font-[700] text-[16px]'}>Tư vấn nhượng quyền: <span className={'font-[400] text-[var(--primary)]'}>{defaultData?.phone_nhuong_quyen}</span>
                    </p>
                    <p className={'font-[700] text-[16px]'}>Email: <span className={'font-[400]'}>{defaultData?.email}</span>
                    </p>
                    <p className={'font-[700] text-[16px]'}>Đăng ký nhãn hiệu số: <span className={'font-[400]'}>{defaultData?.registration}.</span>
                    </p>
                    
                    <div className={'flex flex-wrap items-center gap-[10px] min-w-[50px] mt-5'}>
                        <Image src={FooterLogo1} alt={"laguna logo"} className={'sm:w-[36px] sm:h-[36px] lg:w-[70px] lg:h-[70px] w-full object-cover'}></Image>
                        <Image src={FooterLogo2} alt={"laguna logo"} className={'sm:w-[36px] sm:h-[36px] lg:w-[70px] lg:h-[70px] w-full object-cover'}></Image>
                        <Image src={FooterLogo3} alt={"laguna logo"} className={'sm:w-[36px] sm:h-[36px] lg:w-[70px] lg:h-[70px] w-full object-cover'}></Image>
                        <Image src={FooterLogo4} alt={"laguna logo"} className={'sm:w-[36px] sm:h-[36px] lg:w-[70px] lg:h-[70px] w-full object-cover'}></Image>
                        <Image src={FooterLogo5} alt={"laguna logo"} className={'sm:w-[36px] sm:h-[36px] lg:w-[70px] lg:h-[70px] w-full object-cover'}></Image>
                    </div>
                </div>
                <div>
                    <p className={'text-[20px] font-[700] text-white'}>FANPAGE FACEBOOK</p>
                    <iframe
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FMeatPlus.4plus4&tabs=timeline&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                        width="340" height="130" style={{"border": "none;", overflow: "hidden"}} scrolling="no"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">

                        </iframe>

                </div>
            </div>
            <div className={'flex items-center flex-col-reverse mt-[30px] gap-[10px] lg:flex-row lg:justify-between'}>
                <p className={'text-[13px] lg:text-[15px] text-[hsla(0,0%,100%,.5)]'}>&copy; 2020, MeatPlus.</p>
                <div className={'flex gap-[5px]'}>
                    <a className={classes.icon} href={defaultData?.facebook}>
                        <FaFacebookF className={'text-white'}/>
                    </a>

                    <a className={classes.icon} href={defaultData?.instagram}>
                        <IoLogoInstagram className={'text-white'}/>
                    </a>
                    <a className={classes.icon} href={defaultData?.twitter}>
                        <FaTwitter className={'text-white'}/>
                    </a>
                    <a className={classes.icon} href={`mailto:${defaultData?.email}`}>
                        <IoMdMail className={'text-white'}/>
                    </a>
                </div>
            </div>
        </div>
    </footer>
}

export default Footer;