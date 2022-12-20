import {$authHost, $host} from "./index"
import jwt_decode from 'jwt-decode';
import {decodedToken} from "../stores/userStore";

export const login = async (name: string, password: string) => {
    const {data} = await $authHost.post("/api/user/login", {login: name, password: password})
    localStorage.setItem('token', data.token)
    const user = jwt_decode(data.token)
    return user as decodedToken
}
export const registration = async (name: string, password: string) => {
    const {data} = await $authHost.post("/api/user/registration", {login: name, password})
    localStorage.setItem('token', data.token)
    const user = jwt_decode(data.token)
    return user as decodedToken
}
export const check = async () => {
    console.log(localStorage.getItem('token'),"token")
    const {data} = await $authHost.get("/api/user/check")
    localStorage.setItem('token', data.token)
    const user = jwt_decode(data.token)
    return user as decodedToken
}
export const getUserInfo = async (_id: string) => {
    const {data} = await $host.get("/api/user/" + _id,)
    return data;
}
export const edite = async (form: FormData) => {
    const {data} = await $authHost.patch("/api/user/edite", form)
    return data;
}
export const getContact = async () => {
    const {data} = await $authHost.get("/api/user/contact")
    return data;
}
export const addContact = async (userId: string) => {
    const {data} = await $authHost.patch("/api/user/contact", {_id:userId})
    return data;
}
export const getAll = async (params:any)=>{
    const {data} = await  $authHost.get("/api/user/all", {params: {params}})
    return data
}