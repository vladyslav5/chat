import {$authHost, $host} from "./index"

export const getAll = async (params:any) => {
    const {data} = await $host.get("/api/chat/",{params:{params}})
    return data
}
export const getMy = async () => {
    const {data} = await $authHost.get("/api/chat/my")
    return data
}
export const getOne = async (id:string) => {
    const {data} = await $authHost.get("/api/chat/"+id)
    return data
}
export const createChat = async (chat:FormData) => {
    const {data} = await $authHost.post("/api/chat/",chat)
    return data
}
export const join = async (chatId:string)=>{
    const {data} = await $authHost.patch("/api/chat/" + chatId +"/join")
    return data
}
export const leave = async (chatId:string)=>{
    const {data} = await $authHost.delete("/api/chat/" + chatId)
    return data
}
export  const privetMessage = async (userId:string)=>{
    const {data} = await  $authHost.post("/api/chat/privet",{userId})
    return data
}