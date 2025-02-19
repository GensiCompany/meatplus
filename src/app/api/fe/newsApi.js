import ApiClientPublic from "../ApiClientPublic";
const ManageMenuApi ={
    getAll: async (page=1,pageSize,keyword)=>{
        const params =new URLSearchParams();
        params.append("page",page);
        if(pageSize){
            params.append("limit",pageSize)
        }
        if(keyword){
            params.append("freeWord",keyword)
        }
        return ApiClientPublic("/news?"+params.toString(),"GET");
    },
    getDetail: async (id)=>{
        return ApiClientPublic("/news/"+id,"GET");
    },
}

export default ManageMenuApi;