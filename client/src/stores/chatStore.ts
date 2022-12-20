import {makeAutoObservable} from "mobx";
import {ChatType} from "../types/ChatType";
import {MessageType} from "../types/MessageType";


export class ChatStore {
    _activeChat: string | null = null
    _myChats: ChatType[] | null = null

    constructor() {
        this._myChats = []
        makeAutoObservable(this)
    }

    get Chats() {
        return this._myChats
    }
    addChat(chat:ChatType){
        this._myChats?.push(chat)
    }
    removeChat(chatId:string){
        this._myChats = this._myChats?.filter(chat=>chat._id!==chatId) || null
    }
    setChats(chats:ChatType[]){
        this._myChats = chats
    }
    addMessage(message:MessageType,_id:string) {
        if (this._myChats != null) {
            this._myChats.map(chat => {
                if (chat._id === _id)
                    chat.messages?.push(message)
                // console.log("chat",chat)
                return chat
            })
        }
    }
    get activeChat(){
       return this._myChats?.filter(chat=>chat._id===this._activeChat)[0]
    }
    setActiveChat(id: string) {
        this._activeChat = id
    }
}

export default new ChatStore()