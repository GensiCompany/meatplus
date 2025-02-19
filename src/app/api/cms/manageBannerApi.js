import ApiClient from "../ApiClient";

const ManageBannerApi ={
    createBanner: async (data)=>{
        return ApiClient("banners","POST", data);
    },
    editBanner: async (data,id)=>{
        return ApiClient("banners/"+id,"PATCH", data);
    },
    getAllBanner: async (page, limit)=>{
        return ApiClient(`banners?page=${page}&limit=${limit}`,"GET");
    },
    deleteAllBanner: async (data)=>{
        return ApiClient("banners/deleteMany","POST",data);
    },
}

export default ManageBannerApi;