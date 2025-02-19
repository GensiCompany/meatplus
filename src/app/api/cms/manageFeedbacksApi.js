import ApiClient from "../ApiClient";
const ManageFeedbacksApi ={
    getAllFeedbacks: async (page)=>{
        return ApiClient("contacts?page="+page+"&limit=10","GET");
    }
}

export default ManageFeedbacksApi;