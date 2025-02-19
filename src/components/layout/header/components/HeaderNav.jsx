import Link from "next/link";
import NavLink from "@/components/layout/header/components/NavLink";
import MenuDropdown from "@/components/layout/header/components/MenuDropdown";
import PromotionDropdown from "@/components/layout/header/components/PromotionDropdown";

const navList =[
    {
        title:"TRANG CHỦ",
        link:'/',
    },
    {
        title:"MENU",
        link:'#',
        dropdown:<MenuDropdown></MenuDropdown>
    },
    {
        title:"KHUYẾN MÃI",
        link:'/category/khuyen-mai',
        dropdown: <PromotionDropdown></PromotionDropdown>
    },
    {
        title:"TIN TỨC",
        link:'/category/tin-tuc',
    },
    {
        title:"LIÊN HỆ",
        link:'/lien-he',
    }
]

const HeaderNav = ()=>{
    return <div className='hidden md:flex'>
        {navList?.map((nav,index)=><NavLink key={index} title={nav.title} href={nav.link} dropdown={nav?.dropdown} />)}
    </div>
}

export default HeaderNav;