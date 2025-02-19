import Slider from "@/components/fe/common/slider/Slider";
import { getImageLink } from "@/utils/common";
import bannerApi from "@/app/api/fe/bannerApi";
import Image from "next/image"
async function fetchBannerData() {
    try {
        const res = await bannerApi.getHeroBanner();
        console.log("ress",res)
        return res?.data?.banners?.map((image) => ({
            id: Math.random(),
            src: image?.imageUrl,
            description: image?.description,
        }));
    } catch (error) {
        console.error("Failed to fetch banners:", error);
        return [];
    }
}

export default async function HeroBanner() {
    const listBanner = await fetchBannerData();
    const items = listBanner?.map((image) => (
        <Image
            src={getImageLink(image.src)}
            alt={image.description}
            key={image.id}
            width={1920}
            height={1080}
            className={'w-full h-full'}
        />
    ));
    return <Slider items={items} />;
}
