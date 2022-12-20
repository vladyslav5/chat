import * as React from 'react';

import {ChatType} from "../types/ChatType";
import {useStore} from "../store";
import {Observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import {MY_CHATS_ROUTE} from "../utils/consts";
import {baseURL} from "../apis";

type Props = {
    chat: ChatType,
    route: string
};

export function ChatItem<FC>({chat, route}: Props) {
    const {_id} = useParams()
    const {chatStore} = useStore()
    const history = useNavigate()
    const chats = useStore().chatStore.Chats
    const {userStore} = useStore()
    const alreadyInChat: ChatType[] | undefined = chats?.filter((c) => {
        return c._id === chat._id
    })
    return <Observer>{() => {
        const chatHandler = () => {
            chatStore.setActiveChat(chat._id)
            if (alreadyInChat?.length !== 0) {
                history(MY_CHATS_ROUTE + "/" + chat._id)
            } else {
                history(route + "/" + chat._id)
            }
        }
        return (
            <div
                onClick={chatHandler}
                className={_id === chat._id ? "ChatItem active" : "ChatItem"}
            >
                <img
                    alt={"avatar"}
                    src={baseURL + chat.avatar}
                />
                <h3>{chat.name}</h3>
            </div>
        );
    }
    }</Observer>

};