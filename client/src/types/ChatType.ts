import {MessageType} from "./MessageType";
import {UserType} from "./UserType";

export type ChatType = {
    name: string,
    _id:string,
    avatar?:string,
    users:UserType[]
    messages:MessageType[] | null,
    kind?:string
}

