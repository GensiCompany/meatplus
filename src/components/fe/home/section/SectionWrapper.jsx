import Section from "@/components/fe/home/section/Section";
import Background from "@/assets/images/background.jpg";
import classes from "./SectionWrapper.module.css"
import SectionSingle from "@/components/fe/home/section/SectionSingle";
import Introduction from "@/components/fe/home/section/Introduction";
import sectionApi from "@/app/api/fe/sectionApi";
import Script from "next/script";
import News from "@/components/fe/home/news/News";
import SectionSlide from "@/components/fe/home/section/SectionSlide";

async function fetchSectionData() {
    try {
        return await sectionApi.getAll();
    } catch (error) {
        console.error("Failed to fetch banners:", error);
        return [];
    }
}

const SectionWrapper =async () => {
    const data= await fetchSectionData();
    return (
        <div
            className={classes.container}
            style={{
                backgroundImage: `url(${Background.src})`,
                backgroundPosition: "center",
                width: "100%",
            }}
        >
            <div className={'max-w-[1170px] w-full flex flex-col justify-center items-center gap-[85px]'}>
                {data?.data?.retreasts?.map((section,i)=> {
                    if(section?.type==="MULTIPLE"){
                        return <Section key={i} title={section?.title} items={section.options} data={section}></Section>;
                    }
                    else if(section?.type==="SINGLE"){
                        return <SectionSingle key={i} title={section?.title}
                                              item={section.options?.length > 0 ? section.options[0] : {}}
                                              data={section}></SectionSingle>
                    } else{
                        return <SectionSlide key={i} title={section?.title} items={section.options} data={section}></SectionSlide>;
                    }
                })}
                <Introduction></Introduction>
                <News></News>
            </div>
            <Script
                src="/scripts/sectionAnimation.js"
                strategy="lazyOnload"
            />
        </div>
    );
};

export default SectionWrapper;
