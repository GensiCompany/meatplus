import ApiClient from "../ApiClient";
const ManageLocationApi ={
    getAllLocation: async (page=1,limit=10)=>{
        return ApiClient(`retreasts?page=${page}&limit=${limit}&order=order&sortDirection=asc`,"GET");
    },
    createLocation: async (data)=>{
        return ApiClient("retreasts","POST",data);
    },
    editLocation: async (id,data)=>{
        return ApiClient("retreasts/"+id,"PATCH",data);
    },
    deleteLocationAll: async (data)=>{
        return ApiClient("retreasts/deleteMany","POST",data);
    },
}

export default ManageLocationApi;