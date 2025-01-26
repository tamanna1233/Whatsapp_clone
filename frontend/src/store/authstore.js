import {create} from "zustand"
import { axiosInstances } from "../services/axios"
export const authstore=create((set)=>({
    authUser :"",
    isSingingUp:false ,
    isLoginingIn:false ,
    isCheckingAuth:false ,
    isUpdatingProfile:false ,
     
    checkCurrentUser:async()=>{
        try {
            set({isCheckingAuth:true})
          const res=await  axiosInstances.get("/getcurentuser")
            set({authUser:res.data,isCheckingAuth:false})
            
        } catch (error) {
            console.log(`error while checking auth ${error.message}`)
            set({authUser:null,isCheckingAuth:false})
        }
    }
}))