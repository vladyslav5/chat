import React, {useState} from 'react';
import {ChatType} from "../types/ChatType";
import {useStore} from "../store";
import {useParams} from "react-router-dom";
import {getMy} from "../apis/chatApi";
import {Observer} from "mobx-react-lite";
import Bar from "../Components/Bar";
import {MY_CHATS_ROUTE} from "../utils/consts";
import ContentPart from "../Components/ContentPart";


const MyChats = () => {
    const {chatStore} = useStore()
    useState(() => {
        getMy()
            .then((data: ChatType[]) => {
                console.log(data, "data")
                chatStore.setChats(data)
            })
            .finally(() => {
                setLoading(false)
            })
    })
    const [loading, setLoading] = useState<boolean>(true)
    const params = useParams()
    const [active, setActive] = useState<boolean>(false)
    const myChats = chatStore.Chats
    return <Observer>{() => {
        return (
            loading ? <div className={"appContainer"}>Загрузка</div> :
                <div className={"appContainer"}>
                    <Bar active={active} setActive={setActive} chats={myChats} route={MY_CHATS_ROUTE}/>
                    <ContentPart
                        item={myChats && myChats.filter(chat => chat._id == params._id)[0]}/>
                </div>
        )
    }}</Observer>
};

export default MyChats;