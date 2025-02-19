'use client'
import {
    EmailShareButton,
    FacebookShareButton, LinkedinShareButton, PinterestShareButton,
    TwitterShareButton,
} from "react-share";
import {FaFacebookF, FaLinkedinIn, FaPinterestP} from "react-icons/fa";
import classes from "./LayoutNews.module.css"
import {FaXTwitter} from "react-icons/fa6";
import {MdOutlineMail} from "react-icons/md";
import {useEffect, useState} from "react";
const Share=()=>{
    const [shareUrl,setShareUrl] = useState("");
    useEffect(() => {
        setShareUrl(window.location.href);
    }, []);

    return <div className={'w-full flex justify-center flex-col items-center gap-[14px]'}>
        <div className={"bg-[rgba(0,0,0,.1)] h-[3px] w-[30px] my-[8px] mt-[16px]"}></div>

        <div className={'w-full flex justify-center gap-[4px]'}>
            <FacebookShareButton
                url={shareUrl}
                className={classes.shareContainer}
            >
                <FaFacebookF size={20} color={'#c0c0c0'}/>
            </FacebookShareButton>
            <TwitterShareButton
                url={shareUrl}
                title={"casc"}
                className={classes.shareContainer}
            >
                <FaXTwitter size={20} color={'#c0c0c0'}/>
            </TwitterShareButton>
            <EmailShareButton
                url={shareUrl}
                subject={"csa"}
                body="body"
                className={classes.shareContainer}
            >
                <MdOutlineMail size={20} color={'#c0c0c0'}/>
            </EmailShareButton>
            <PinterestShareButton
                url={shareUrl}
                media={shareUrl}
                className={classes.shareContainer}
            >
                <FaPinterestP size={20} color={'#c0c0c0'}/>
            </PinterestShareButton>
            <LinkedinShareButton
                url={shareUrl}
                className={classes.shareContainer}
            >
                <FaLinkedinIn size={20} color={'#c0c0c0'}/>
            </LinkedinShareButton>
        </div>
    </div>
}

export default Share