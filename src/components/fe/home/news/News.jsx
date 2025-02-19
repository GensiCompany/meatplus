'use client';

import newsApi from "@/app/api/fe/newsApi";
import Slider from "react-slick";
import {useEffect, useState} from "react";
import NewsItemCol from "@/components/fe/news/NewsItemCol";
import {Carousel} from "antd";

const News =()=>{
    const settings = {
        dots: false,
        infinite: true,
        centerMode: false,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    variableWidth: false,
                },
            },
        ],
    };
    const [data,setData]=useState([])
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => {
        setIsHydrated(true);
        const  fetchDefaultData = async()=>{
            try{
                const res = await newsApi.getAll(1,9)
                setData(res?.data?.news);
            }
            catch (e) {
                console.log(e)
            }
        }
        fetchDefaultData().then();
    }, []);
    return <div className={'w-full flex-col flex gap-[20px] BOTTOM_TO_TOP homeSection '}>
        <p className={'promo-title'}>Tin tức mới</p>
        {isHydrated && <Carousel dots={false} slidesToShow={3} speed={500} autoplay={true} infinite={true}  responsive={ [
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    },
                },
            ]
        } >
            {data?.map((x, i) => <NewsItemCol key={i} item={x} url={"tin-tuc"}></NewsItemCol>)}
        </Carousel>}
    </div>

}

export default News;