import menuApi from "@/app/api/fe/menuApi";
import Background from "@/assets/images/background.jpg";
import classes from "./DetailMenuStyle.module.css"
import Image from "next/image";
import {createUrlFriendly, getImageLink} from "@/utils/common";
import BackgroundBooking from "@/assets/images/bg_menu.jpg"
import {IoIosArrowForward} from "react-icons/io";
import BookingForm from "@/components/fe/common/booking/BookingForm";
import DOMPurify from "isomorphic-dompurify";

export async function generateMetadata({ params }) {
    const { slug } = params;
    const slugArray = slug.split("-");
    const id = slugArray[slugArray.length - 1];

    const { data: { menu: detail } = {} } = await menuApi.getDetail(id).catch(() => null);

    if (!detail) {
        return {
            title: "Menu Not Found - Meat Plus Việt Nam",
            description: "The menu you are looking for could not be found.",
        };
    }

    return {
        title: `${detail.title} - Meat Plus Việt Nam`,
        description: detail.title || "Explore our amazing menu items.",
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function CMS({params}) {
    const {slug} = params;
    const slugArray = slug.split("-");
    const id = slugArray[slugArray.length - 1];

    const { data: { menu: detail }} = await menuApi.getDetail(id).catch(() => null);
    const { data: { menus: otherMenus }} = await menuApi.getAll().catch(() => []);
    const sanitizedHtml = DOMPurify.sanitize(detail?.content);

    return <div className={'w-full '}>
        <div style={{
            backgroundImage: `url(${Background.src})`,
            backgroundPosition: "center",
            width: "100%"
        }} className={'flex justify-center flex-col items-center '}>
            <div className={"max-w-[1170px] w-full py-[40px] flex justify-center flex-col items-center"}>
                <div className={'flex gap-[10px] items-center w-[80%] justify-center mb-[24px]'}>
                    <div className={classes.line}></div>
                    <p className={classes.title}>{detail?.title}</p>
                    <div className={classes.line}></div>
                </div>
                <div className={'mb-[140px]'}>
                    <div dangerouslySetInnerHTML={{__html: sanitizedHtml}}/>
                </div>
                <div>
                    <p className={'text-center text-[var(--primary)] font-[700] text-[40px]'}
                       style={{fontFamily: "var(--font-myriad-pro)"}}>CÁC SET KHÁC</p>
                    <div className={classes.other}>
                        {otherMenus?.slice(0, 6)?.map((mn, i) => <a href={"/category/menu/" + createUrlFriendly(mn?.name + "-" + mn?._id)} key={i} className={`${classes.gridItem}`}>
                            <Image src={getImageLink(mn?.imageUrl)} alt={'menu image'} width={1920} height={1080}
                                   objectFit={'cover'} className={'w-[360px] h-[360px] object-cover'}></Image>
                            <div className={'min-h-[180px]'}>
                                <p className={'text-center text-[var(--primary)] text-[16px] mt-[10px] font-[700]'}>{mn.name}</p>
                            </div>
                        </a>)}
                    </div>
                </div>
            </div>
        </div>
        <div style={{
            width: '100%',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${BackgroundBooking.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
        }} className={'flex justify-center text-white py-[20px] gap-[20px] '}>
            <div className={'max-w-[1170px] flex flex-col sm:flex-row px-[10px] sm:px-[0] gap-[40px]'}>
                <div className={' flex-1'}>
                    <p style={{fontFamily: "var(--font-myriad-pro)"}} className={'text-white text-[40px]'}>LIÊN HỆ ĐẶT
                        BÀN</p>
                    <p className={'text-white mb-[18px]'}>Quý khách vui lòng đặt bàn trước để có trải nghiệm thưởng thức
                        ẩm thực tốt nhất tại Meatplus</p>
                    <p className={"mb-[18px]"}>Gợi ý đặt bàn:</p>
                    <div className={classes.bookingInfo}>
                        <IoIosArrowForward color={"#0a82ec"}/> <span>Đi 1 người: đặt bàn đơn</span>
                    </div>
                    <div className={classes.bookingInfo}>
                        <IoIosArrowForward color={"#0a82ec"}/> <span>Đi 2 người: đặt bàn đôi</span>
                    </div>
                    <div className={classes.bookingInfo}>
                        <IoIosArrowForward color={"#0a82ec"}/> <span>Đi nhóm 4-6 người: đặt bàn 6 người.</span>
                    </div>
                    <div className={classes.bookingInfo}>
                        <IoIosArrowForward color={"#0a82ec"}/> <span>Đi nhóm 6-12 người: đặt bàn dài</span>
                    </div>
                    <div className={classes.bookingInfo}>
                        <IoIosArrowForward color={"#0a82ec"}/> <span>Đi nhóm &gt;12 người: gọi trực tiếp Hotline: 0328.63.63.82</span>
                    </div>
                </div>
                <div className={'w-full flex-1'}>
                    <p className={"text-[30px] text-white text-center mb-[4px] font-[700]"}>ĐẶT BÀN MEAT PLUS</p>
                    <p className={'text-[14px] text-white text-center'}>Vui lòng đặt trước từ 1 đến 3h để được phục vụ tốt nhất</p>
                    <BookingForm></BookingForm>
                </div>
            </div>

        </div>
    </div>
}
