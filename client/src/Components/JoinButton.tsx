import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {MY_CHATS_ROUTE} from "../utils/consts";
import {join} from "../apis/chatApi";
import {useStore} from "../store";

const JoinButton = () => {
    const history = useNavigate()
    const {_id} = useParams()
    const {chatStore} = useStore()
    return (
        <div className={"Content-wrap"}>
            <button
                onClick={()=>{
                    _id && join(_id).then((res)=>{
                        chatStore.addChat(res)
                        // console.log(chatStore.Chats,"res")
                    })
                    history(MY_CHATS_ROUTE + "/" + _id )
                }}
            >
                Вступить
            </button>
        </div>
    );
};

export default JoinButton;