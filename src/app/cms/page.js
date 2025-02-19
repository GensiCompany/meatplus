'use client';
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function CMS() {
    const router = useRouter();
    useEffect(() => {
        router.push("/cms/manageBanner")
    }, []);
    return <></>
}
