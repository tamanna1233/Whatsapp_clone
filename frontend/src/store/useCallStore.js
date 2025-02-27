import { create } from "zustand"
export const usecallStore=create((set)=>({
    chatID:"",
    isInCall:false,
    isMinimized:false,
    startCall:()=>set({isInCall:true,isMinimized:false}),
    endCall:()=>set({isInCall:false,isMinimized:false}),
    toggleMinimized:()=>{set((state)=>({isMinimized :!state.isMinimized}))}
}))

