import React, {useEffect, useRef, useState} from 'react';
import {ChatType} from "../types/ChatType";
import {useLocation, useParams} from "react-router-dom";
import {useStore} from "../store";
import {sendMessage} from "../apis/messageApi";
import useWS from "../hook/useWS";
import ChatBar from "./ChatBar";
import MessageItem from "./MessageItem";
import Input from "./Input";
import JoinButton from "./JoinButton";
import {observer} from "mobx-react-lite";

interface props {
    item: ChatType | null
}

const ContentPart = ({item}:props) => {
    const {_id} = useParams()
    // const item:ChatType | null = useStore().chatStore.activeChat || null
    const messageRef = useRef<HTMLDivElement>(null)
    const location = useLocation()
    const {chatStore} = useStore()
    const [isMyChats,setIsMyChats] = useState<boolean>(false)
    const executeScroll = () => {
        messageRef.current?.scroll({top: messageRef.current?.scrollHeight, behavior: 'smooth'})
    }
    useEffect(() => {
        _id && setIsMyChats(location.pathname.replaceAll(_id, "") === "/my/")
    }, [location])
    useEffect(()=>executeScroll,[item?.messages?.length])
    const send = (message: string) => {
        if (_id) {
            sendMessage(_id, message)
                .then((result) => {
                    chatStore.addMessage(result, _id)
                    sendWS({message: result, chatId: _id})
                })
        }
    }
    const sendWS = useWS()
    const {isAuth} = useStore().userStore
    return (
        <div className={"Content-wrap"}>
            {!item ? <h1> выберите чат</h1> :
                <>
                    <ChatBar chat={item}/>
                    {item?.messages?.length === 0 ?
                        <h2>здесь еще ничего нет</h2>
                        :
                        <div ref={messageRef} className={"message_wrap"}>
                            {item?.messages?.map((message) =>
                                <MessageItem message={message}></MessageItem>
                            )}
                            <div id={"scroll"}/>
                        </div>
                    }
                    <div
                        className={"Content-wrap input"}
                    >
                        {isMyChats ?
                            <Input send={send}/>
                            :
                            isAuth && <JoinButton/>
                        }
                    </div>
                </>
            }
        </div>
    )
};

export default observer(ContentPart);