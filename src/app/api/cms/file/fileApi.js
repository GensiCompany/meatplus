import ApiClient from "../../ApiClient";
const FileApi ={
    getAll: async (type,page)=>{
        return ApiClient("files?page="+page+"&limit=50&type="+type,"GET");
    },
    delete: async (id)=>{
        return ApiClient("files/"+id,"DELETE");
    },
    createFile:async (file)=>{
        return ApiClient("files","POST",file);
    },
}

export default FileApi;