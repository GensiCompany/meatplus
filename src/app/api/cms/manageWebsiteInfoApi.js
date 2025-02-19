import ApiClient from "../ApiClient";
import ApiClientPublic from "../ApiClientPublic";

const ManageMenuApi ={
    editWebsiteInfo: async (data)=>{
        return ApiClient("/settings","PATCH",data);
    },
    getAllWebsiteInfo: async ()=>{
        return ApiClientPublic("/settings","GET");
    }
}

export default ManageMenuApi;