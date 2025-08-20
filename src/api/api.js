import axios from "axios";

const local = "http://localhost:5000";
const prod = "https://api.example.com";

let api_url = "";

let mode = "dev"

if(mode === "dev"){
    api_url = local
}else{
    api_url =  prod
}

const api = axios.create({
    baseURL: `${api_url}/api`,
    withCredentials: true    
})

export default api;

