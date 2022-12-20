import {makeAutoObservable} from "mobx";
import {UserType} from "../types/UserType";
import {useRef} from "react";

export type decodedToken = {
    login: string,
    roles: [string]
    _id: string,

}

export class UserStore {
    currentUser?: decodedToken
    _chosenUser: UserType | null = null
    _active: boolean = false
    _isAuth: boolean
    _socket?: WebSocket

    constructor() {
        this._isAuth = false
        makeAutoObservable(this)
    }

    setChosenUser(chosenUser: UserType) {
        this._chosenUser = chosenUser
        this._active = true

    }
    get socket(){
        return this._socket
    }
    get chosenUser() {
        return this._chosenUser
    }

    get active() {
        return this._active
    }

    setActive(bol: boolean) {
        this._active = bol
    }

    setIsAuth(bol: boolean, user: decodedToken | null) {
        this._socket = new WebSocket("ws://localhost:5000/" +localStorage.getItem("token"))
        if (user) this.currentUser = user
        this._isAuth = bol
    }

    get isAuth() {
        return this._isAuth
    }
}

export default new UserStore()