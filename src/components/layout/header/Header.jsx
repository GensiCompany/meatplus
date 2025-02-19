import Logo from "@/assets/images/logo.png"
import Image from "next/image"
import classes from "@/components/layout/header/style/header.module.css"
import HeaderNav from "@/components/layout/header/components/HeaderNav";
import Booking from "@/components/layout/header/components/Booking";
import {headers} from "next/headers";
import CmsRouteList from "@/utils/cmsRouteList";
import MenuDrawer from "@/components/layout/header/components/MenuDrawer";
import Script from 'next/script';
const Header =async ()=>{
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");

    return <>
        <div className={"padding-header"}></div>
        <header className={classes.header}
                style={CmsRouteList.some(x => pathname?.startsWith(x)) ? {display: 'none'} : {}}>
            <div className={classes.container}>
                <a href={"/"}>
                    <Image src={Logo.src} className={"headerImg"} width={600} height={600} alt='logo'></Image>
                    <div className='w-[40px] h-[40px] hidden lg:inline-block'></div>
                </a>

                <div className='flex items-center flex-wrap justify-end '>
                    <HeaderNav></HeaderNav>

                    <div className={'flex gap-[30px] items-center'}>
                        <Booking></Booking>
                        <MenuDrawer></MenuDrawer>
                    </div>
                </div>
            </div>
        </header>
        <Script
            src="/scripts/headerScroll.js"
            strategy="lazyOnload"
        />
    </>

}

export default Header;