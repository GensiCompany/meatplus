import ApiClientPublic from "../ApiClientPublic";
const SectionApi ={
    getAll: async ()=>{
        return ApiClientPublic("retreasts?sortField=order&sortDirection=asc","GET");
    },
    getDetail: async (id)=>{
        return ApiClientPublic("retreasts/"+id,"GET");
    },
    booking: async (data)=>{
        return ApiClientPublic("contacts","POST",data);
    }
}

export default SectionApi;