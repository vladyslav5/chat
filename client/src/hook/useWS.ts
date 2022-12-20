import {useEffect, useRef} from 'react';
import {MessageType} from "../types/MessageType";
import {useStore} from "../store";


const UseWs = () => {
    const addMessage = (message: any) => {
        chatStore.addMessage(message.message, message.chatId)
    }
    const socket = useStore().userStore.socket || new WebSocket("ws://localhost:5000")
    const {chatStore} = useStore()
    useEffect(() => {
        socket.onopen = () => {
            console.log("open conncetion")
        }
        socket.onclose = event => {
            if (event.wasClean) {
                console.log("соединение закрыто  чисто ")
            } else {
                console.log("обрыв соиденения ")
            }
        }
        socket.onerror = (err) => {
            console.log("Ошибка " + err);
        }
        socket.onmessage = m => {
            const message = JSON.parse(m.data)
            addMessage(message)
            console.log(" i got message :", message)
        }
    }, [])

    return (message: any) => {
        const stringMessage: string = JSON.stringify(message)
        socket.send(stringMessage)
    }
}

export default UseWs;