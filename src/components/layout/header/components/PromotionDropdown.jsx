
'use client'

import Dropdown from "@/components/layout/header/components/Dropdown";
import Link from "next/link";
import {createUrlFriendly} from "@/utils/common";
import classes from "../style/Dropdown.module.css"
import locationApi from "@/app/api/fe/locationApi";
import promotionApi from "@/app/api/fe/promotionApi";
import { useEffect, useState } from "react";

const PromotionDropdown = () =>{
    const [discounts, setDiscount] = useState([]);
    const [locations, setLocation] = useState([]);

    useEffect(() => {
        async function fetchLocation() {
            try {
                const res =await locationApi.getAll();
                setLocation(res?.data?.retreasts)
            } catch (error) {
                return [];
            }
        }
        const fetchNews = async (page, search)=>{
            try{
                const res = await promotionApi.getAll(page, 100);
                setDiscount(res?.data?.discounts)
            } catch (e) {
                console.log(e);
            }
        }
        fetchNews();
        fetchLocation();
    }, [])

    const locationNews = [];
    for (const location of locations || []) {
        const filteredDiscounts = discounts?.filter(discount =>  discount.retreasts?.includes(location._id));
        const latestNews = filteredDiscounts?.length > 0 ? filteredDiscounts[0] : null;
        if (latestNews) {
            locationNews.push({
                ...location,
                latestNews,
            });
        }
    }

    return <Dropdown>
        <div className='flex'>
            <div className={"w-[240px] max-h-[400px] overflow-y-auto"}>
                <p className={classes.title}>CÁC CƠ SỞ</p>
                {locationNews?.map((mn, i) => <Link className={classes.item} href={"/category/khuyen-mai/" + createUrlFriendly(mn?.latestNews?.name + "-" + mn?.latestNews?._id)} key={i}>{mn?.name}</Link>)}
            </div>
        </div>
    </Dropdown>
}

export default PromotionDropdown;