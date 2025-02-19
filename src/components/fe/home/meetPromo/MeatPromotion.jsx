import ImagePromo from "@/components/fe/home/meetPromo/ImagePromo";
import ImageAbout1 from "@/assets/images/image_about_1.png";
import ImageAbout2 from "@/assets/images/image_about_2.png";
import ImageAbout3 from "@/assets/images/image_about_3.png";
import ImageAbout4 from "@/assets/images/image_about_4.png";

import Slider from "@/components/fe/common/slider/Slider";
import Image from "next/image";
import bannerApi from "@/app/api/fe/bannerApi";
import classes from "./MeetPromotion.module.css";
import { getImageLink } from "@/utils/common";

async function fetchPromotionBanner() {
    try {
        const res = await bannerApi.getPromotionBanner();
        return res?.data?.banners?.map((image) => ({
            id: Math.random(),
            src: image?.imageUrl,
            description: image?.description,
        }));
    } catch (error) {
        console.error("Failed to fetch promotion banners:", error);
        return [];
    }
}

export default async function MeatPromotion() {
    const listBanner = await fetchPromotionBanner();

    const items = listBanner?.map((image) => (
        <Image
            src={getImageLink(image.src)}
            alt={image.description}
            key={image.id}
            width={1920}
            height={1080}
        />
    ));
    return (
        <div className={`w-full justify-center flex-col py-[60px] px-[20px] ${classes.container}`}>
            <div>
                <p className="promo-title mb-[60px]">THỊT BÒ HẢO HẠNG</p>
                <div className="flex w-full justify-center items-center">
                    <div className="flex flex-col gap-[85px]">
                        <ImagePromo image={ImageAbout1.src} text={"100% Anerdeen Angus"}></ImagePromo>
                        <ImagePromo image={ImageAbout3.src} text={"Không thuốc kháng sinh"}></ImagePromo>
                    </div>
                    <div className={classes.slider}>
                        <Slider items={items}></Slider>
                    </div>
                    <div className="flex flex-col gap-[85px]">
                        <ImagePromo image={ImageAbout2.src} text={"Chăn nuôi bằng ngũ cốc"}></ImagePromo>
                        <ImagePromo image={ImageAbout4.src} text={"Không hóc môn tăng trưởng"}></ImagePromo>
                    </div>
                </div>
            </div>
        </div>
    );
}
