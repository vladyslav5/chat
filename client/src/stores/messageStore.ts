import {makeAutoObservable} from "mobx";
import {MessageType} from "../types/MessageType";


export class MessageStore {

    constructor() {
        makeAutoObservable(this)
    }


}

export default new MessageStore()