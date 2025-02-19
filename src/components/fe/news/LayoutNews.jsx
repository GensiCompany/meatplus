import LatestNews from "@/components/fe/news/LatestNews";
import NewsItem from "@/components/fe/news/NewsItem";
import PaginationCustom from "@/components/fe/common/pagination/PaginationCustom";

const LayoutNews = ({news, page,pageSize,url,total})=>{
    return <div className={'w-full flex justify-center'}>
        <div className={'flex flex-col md:flex-row justify-center w-full max-w-[1200px] py-[30px]'}>
            <div className={'px-[10px] md:px-[30px] w-full  md:w-3/4'}>
                {news?.map((news, i) => <NewsItem item={news} key={i} url={url}></NewsItem>)}
                <PaginationCustom total={total} page={page} pageSize={pageSize} url={url}></PaginationCustom>
            </div>
            <LatestNews></LatestNews>
        </div>
    </div>
}

export default LayoutNews;