'use client';
import Slider from "react-slick";
import CarouselItem from "@/app/lien-he/CarouselItem";
import {useEffect, useState} from "react";

const LienHeCarousel = ({data})=> {
    const chunkedLocations = [];

    if (data) {
        for (let i = 0; i < data.length; i += 3) {
            const chunk = data.slice(i, i + 3).map((retreast) => (
                <CarouselItem
                    key={retreast?.id || Math.random()}
                    item={{
                        id:retreast?._id,
                        name: retreast?.name,
                        imageUrl: retreast?.imageUrl,
                        phoneNumber: retreast?.phoneNumber,
                        address: retreast?.address,
                        facebook_link:retreast?.facebook_link,
                        ...retreast
                    }}
                />
            ));
            chunkedLocations.push(chunk);
        }
    }

    const settings = {
        dots: true,
        infinite: true,
        centerMode: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1124,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    variableWidth: false,
                },
            },
        ],
    };
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => {
        setIsHydrated(true);
    }, []);
    return <div className="mb-[20px] sm:mb-20">
        <div className={'hidden sm:block'}>
            {isHydrated && <Slider {...settings} className={'location carousel-lien-he'}>
                {chunkedLocations?.map((x, i) => <div className={"lienHeSlider"} key={i}>
                    {x?.map(y => y)}
                </div>)}
            </Slider>}
        </div>
        <div className={'sm:hidden px-[10px] sm:px-0 flex flex-col gap-[4px]'}>
            {chunkedLocations?.map((x, i) => {return x?.map(y => y)})}
        </div>
    </div>
}

export default LienHeCarousel;

