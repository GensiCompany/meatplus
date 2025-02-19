'use client';
import React, {useEffect, useState} from 'react';
import { Carousel } from 'antd';
import "./slider.css";
const Slider =({items, options})=>{
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => {
        setIsHydrated(true);
    }, []);
    return <>
        {isHydrated && <Carousel arrows infinite={true} draggable {...options}>
            {items?.map((item, i) => (
                <div key={i} className={`flex justify-center items-center`} style={{display: 'flex !important'}}>
                    {item}
                </div>))}
        </Carousel>}
    </>
}

export default Slider;