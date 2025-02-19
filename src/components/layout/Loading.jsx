import Logo from "@/assets/images/logo.png"
import Image from "next/image"
const Loading =()=>{
    return <div className='w-full h-full flex flex-col gap-[4px] items-center justify-center min-h-[100vh]'>
        <div className="animate-bounce">
            <Image src={Logo.src} alt="logo" width={100} height={100} ></Image>
        </div>
        <p className='text-[20px] font-[700]'>Đang tải</p>
    </div>
}

export default Loading;