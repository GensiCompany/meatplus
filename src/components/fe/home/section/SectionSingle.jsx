import Link from "next/link";
import Image from "next/image";
import classes from "./SectionWrapper.module.css"
import {getImageLink} from "@/utils/common";

const SectionSingle = ({title,item, data})=>{
    return <div className={`${classes.sectionContainer} homeSection ${data?.appearTransition}`}>
        <p className={'promo-title'}>{title}</p>
        <div className={"w-full"}>
            {item?.link?<Link className={classes.sectionItem} href={item?.link}>
                <Image className={"w-full h-auto object-cover"} src={getImageLink(item?.imageUrl)} alt={"menu"} width={1920} height={1080} objectFit={'cover'} ></Image>
            </Link>:<Image className={`${classes.sectionItem} w-full h-auto object-cover`} src={getImageLink(item?.imageUrl)} alt={"menu"} width={1920} height={1080} objectFit={'cover'} ></Image>}
        </div>
    </div>
}

export default SectionSingle;