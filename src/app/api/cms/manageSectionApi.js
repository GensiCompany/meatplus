import ApiClient from "../ApiClient";
const ManageSectionApi ={
    createSection: async (data)=>{
        return ApiClient("sections","POST",data);
    },
    editSection: async (data)=>{
        return ApiClient("sections","PATCH",data);
    },
    getAllSection: async (page=1,pageSize)=>{
        return ApiClient("sections?order=order&sortDirection=asc&page="+page+"&limit="+pageSize,"GET");
    },
    deleteSectionAll: async (data)=>{
        return ApiClient("sections/deleteMany","POST",data);
    },
}

export default ManageSectionApi;