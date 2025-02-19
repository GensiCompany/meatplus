import ApiClientPublic from "../ApiClientPublic";
const WebsiteInfoApi ={
    getWebsiteInfo: async ()=>{
        return ApiClientPublic("settings","GET");
    }
}

export default WebsiteInfoApi;