import ApiClientPublic from "../ApiClientPublic";
const PromotionApi ={
    getDetail: async (id)=>{
            return ApiClientPublic("discounts/"+id,"GET");
    },
    getAll: async (page=1,pageSize=10,keyword="")=>{
        const params =new URLSearchParams();
        params.append("page",page);
        if(pageSize){
            params.append("limit",pageSize)
        }
        if(keyword){
            params.append("freeWord",keyword)
        }
        return ApiClientPublic("discounts?"+params.toString(),"GET");
    }
}

export default PromotionApi;