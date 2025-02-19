import ApiClientPublic from "../ApiClientPublic";
const ManageMenuApi ={
    getAll: async ()=>{
        return ApiClientPublic("/menus","GET");
    },
    getDetail: async (id)=>{
        return ApiClientPublic("/menus/"+id,"GET");
    },
    getOtherMenus: async (id)=>{
        return ApiClientPublic("/menus/getOtherMenus/"+id,"GET");
    }
}

export default ManageMenuApi;