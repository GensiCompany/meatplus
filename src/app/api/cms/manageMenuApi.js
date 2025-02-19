import ApiClient from "../ApiClient";
const ManageMenuApi ={
    createMenu: async (data)=>{
        return ApiClient("menus","POST",data);
    },
    editMenu: async (data,id)=>{
        return ApiClient("menus/"+id,"PATCH",data);
    },
    getAllMenu: async (page)=>{
        return ApiClient("menus?page="+page+"&limit=10","GET");
    },
    deleteMenu: async (id)=>{
        return ApiClient("menus/"+id,"DELETE");
    },
    deleteMenuAll: async (data)=>{
        return ApiClient("menus/deleteMany","POST",data);
    },
}

export default ManageMenuApi;