import ApiClientPublic from "../ApiClientPublic";
const ManageMenuApi ={
    createContacts: async (data)=>{
        return ApiClientPublic("/contacts","POST",data);
    }
}

export default ManageMenuApi;