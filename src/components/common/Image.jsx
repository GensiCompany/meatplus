'use client';

import Image from "next/image";
import DefaultImage from "@/assets/images/not_found_image.jpg"
const ImageCustom =({imageProps})=>{
    return <Image{...imageProps} onErrorCapture={(e)=>{
        e.target.src=DefaultImage.src;
    }} alt={imageProps?.alt}></Image>
}

export default ImageCustom;