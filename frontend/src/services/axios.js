 import axios from "axios"
 export const axiosInstances=axios.create({
    baseURL:"http://localhost:8000",
    withCredentials:true,
    timeout:2000
 })