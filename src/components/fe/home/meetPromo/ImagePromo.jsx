import Image from "next/image";
import classes from "./ImagePromo.module.css"
const ImagePromo = ({image,text})=>{
    return <div className='flex flex-col items-center'>
        <div className='h-[150px] w-[150px] relative'>
            <div className={classes.circle}></div>
            <div className={classes.circle}></div>
            <div className={classes.circle}></div>
            <div className={classes.circle}></div>
            <Image src={image} alt={"about image"} width={150} height={150}></Image>
        </div>
        <p className={classes.text}>{text}</p>
    </div>

}

export default ImagePromo;