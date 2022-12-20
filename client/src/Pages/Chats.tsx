import React, {useEffect, useState} from 'react';
import ContentPart from "../Components/ContentPart";
import {ChatType} from "../types/ChatType";
import {getAll} from "../apis/chatApi";
import {CHATS_ROUTE} from "../utils/consts";
import {useParams} from "react-router-dom";
import Bar from "../Components/Bar";


const Chats = () => {
    const [active, setActive] = useState<boolean>(false)
    const [chats, setChats] = useState<ChatType[] | null>(null)
    useEffect(() => {
        getAll({}).then((res) => {
            setChats(res)
            console.log(res)
        })
    }, [])
    const chatId = useParams()._id
    return (
        <div className={"appContainer"}>
            <Bar active={active} setActive={setActive} chats={chats} route={CHATS_ROUTE}/>
            <ContentPart
                item={chats && chats.filter(chat => chat._id == chatId)[0]}/>
        </div>
    );
};

export default Chats;