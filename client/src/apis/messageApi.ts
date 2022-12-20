import {$authHost, $host} from "./index"
import jwt_decode from 'jwt-decode';

export const getAll = async (chatId:string) => {
    const {data} = await $host.get("/api/chat/"+chatId+'/message')
    return data
}
export const getbyUser = async (chatId:string,userId:string) => {
    const {data} = await $authHost.get("/api/chat/"+chatId+'/message/'+userId)
    return data
}
export const sendMessage = async (chatId:string,text:string) => {
    const {data} = await $authHost.post("/api/chat/"+chatId+"/message",{text:text})
    return data
}
export const sendFiles = async (chatId:string,formData:FormData) => {
    const {data} = await $authHost.post("/api/chat/"+chatId+"/message",formData)
    return data
}