import ApiClientPublic from "../ApiClientPublic";
const ManageBannerApi ={
    getHeroBanner: async ()=>{
        return ApiClientPublic("banners?position=HEROBANNER","GET");
    },
    getPromotionBanner: async ()=>{
        return ApiClientPublic("banners?position=PRODUCTSHOWCASE","GET");
    },
    getLocationBanner: async ()=>{
        return ApiClientPublic("banners?position=LOCATIONINFO","GET");
    },
}

export default ManageBannerApi;