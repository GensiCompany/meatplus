import Link from "next/link";
import Image from "next/image";
import classes from "./SectionWrapper.module.css";
import { getImageLink } from "@/utils/common";

const Section = ({title,items,data})=>{
    return <div className={`${classes.sectionContainer} homeSection ${data?.appearTransition}`}>
        <p className={'promo-title'}>{title}</p>
        <div className={classes.section}>
            {items?.map((item,i)=>(item?.link?<Link className={`${classes.sectionItem} ${classes.multiple}`} key={i} href={item?.link}>
                <Image key={i} src={getImageLink(item?.imageUrl)} alt={"menu"} width={1920} height={1080} objectFit={'cover'}></Image>
            </Link>:<Image className={`${classes.sectionItem} ${classes.multiple}`} key={i} src={getImageLink(item?.imageUrl)} alt={"menu"} width={1920} height={1080} objectFit={'cover'}></Image>))}
        </div>
    </div>
}

export default Section;