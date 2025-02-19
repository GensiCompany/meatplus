import ApiClient from "../ApiClient";
const ManageNewsApi ={
    getAllDiscounts: async ()=>{
        return ApiClient("discounts","GET");
    },
    createDiscounts: async (data)=>{
        return ApiClient("discounts","POST",data);
    },
    editDiscounts: async (id,data)=>{
        return ApiClient("discounts/"+id,"PATCH",data);
    },
    deleteDiscounts: async (data)=>{
        return ApiClient("discounts/"+data,"DELETE");
    },
    deleteDiscountsAll: async (data)=>{
        return ApiClient("discounts/deleteMany","POST",data);
    },
}

export default ManageNewsApi;