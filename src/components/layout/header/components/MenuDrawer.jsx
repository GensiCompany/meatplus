'use client';

import { LuMenu } from "react-icons/lu";
import { Drawer, Menu } from "antd";
import { useEffect, useState } from "react";
import classes from "../style/menuDrawer.module.css";
import menuApi from "@/app/api/fe/menuApi";
import promotionApi from "@/app/api/fe/promotionApi";
import {createUrlFriendly} from "@/utils/common";
import locationApi from "@/app/api/fe/locationApi";
import {useRouter} from "next/navigation";

const MenuDrawer = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const showDrawer = () => {
        setIsOpenDrawer(true);
    };
    const onClose = () => {
        setIsOpenDrawer(false);
    };

    const [items, setItems] = useState([
        {
            key: 'sub1',
            label: 'Trang chủ',
            link:'/'
        },
        {
            key: 'menu',
            label: 'Menu',
            children: []
        },
        {
            key: 'sub4',
            label: 'Khuyến mãi',
            children: [],
            link:'/category/khuyen-mai'
        },
        {
            key: 'sub5',
            label: 'Tin tức',
            link:'/category/tin-tuc'
        },
        {
            key: 'sub6',
            label: 'Liên hệ',
            link:'/lien-he'
        },
    ]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resMenu = await menuApi.getAll();
                const menus = resMenu?.data?.menus || [];

                const listMenu = [];
                const listCombo = [];

                menus.forEach(x => {
                    if (x.type === "COMBO") {
                        listCombo.push({
                            key: `combo-${x._id}`,
                            label: x.name,
                            link:"/category/menu/" + createUrlFriendly(x?.name + "-" + x?._id)
                        });
                    } else {
                        listMenu.push({
                            key: `menu-${x._id}`,
                            label: x.name,
                            link:"/category/menu/" + createUrlFriendly(x?.name + "-" + x?._id)
                        });
                    }
                });
                const resLocations = await locationApi.getAll(1, 100, '');
                const locations = resLocations?.data?.retreasts || [];
                const promotions = await promotionApi.getAll(1, 100);
                const discounts = promotions?.data?.discounts || [];
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
                const listDiscounts = locationNews.map(discount => ({
                    key: `discount-${discount._id}`,
                    label: discount.name,
                    link:"/category/khuyen-mai/" + createUrlFriendly(discount?.latestNews?.name + "-" + discount?.latestNews?._id)
                }));
                setItems(prevItems => {
                    return prevItems.map(item => {
                        if (item.key === 'menu') {
                            return {
                                ...item,
                                children: [
                                    {
                                        key: 'menu-items',
                                        label: 'Menu',
                                        children: listMenu
                                    },
                                    {
                                        key: 'combo-items',
                                        label: 'Combo',
                                        children: listCombo
                                    }
                                ]
                            };
                        } else if (item.key === 'sub4') {
                            return {
                                ...item,
                                children: listDiscounts
                            };
                        }
                        return item;
                    });
                });

            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData().then();
    }, []);

    const router = useRouter();

    return (
        <div className={classes.container}>
            <LuMenu color={'white'} size={25} onClick={showDrawer} />
            <Drawer title="" onClose={onClose} open={isOpenDrawer} width={300}>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                    onSelect={({ item }) => {
                        router.push(item?.props?.link);
                        setIsOpenDrawer(false)
                    }}
                />
            </Drawer>
        </div>
    );
};

export default MenuDrawer;

