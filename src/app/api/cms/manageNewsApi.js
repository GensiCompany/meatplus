import ApiClient from "../ApiClient";
const ManageNewsApi ={
    getAllNews: async ()=>{
        return ApiClient("news","GET");
    },
    createNews: async (data)=>{
        return ApiClient("news","POST",data);
    },
    editNews: async (id,data)=>{
        return ApiClient("news/"+id,"PATCH",data);
    },
    deleteNews: async (data)=>{
        return ApiClient("news/"+data,"DELETE");
    },
    deleteNewsAll: async (data)=>{
        return ApiClient("news/deleteMany","POST",data);
    },
}

export default ManageNewsApi;