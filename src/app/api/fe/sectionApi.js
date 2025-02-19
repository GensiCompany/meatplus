import ApiClientPublic from "../ApiClientPublic";
const SectionApi ={
    getAll: async ()=>{
        return ApiClientPublic("/sections?order=order&sortDirection=asc","GET");
    }
}

export default SectionApi;