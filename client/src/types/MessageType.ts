import {UserType} from "./UserType";

export type  MessageType = {
    text:string,
    createdAt:string
    user:UserType,
    audio?:string,
    chatId?:string
    files?:[string]
}