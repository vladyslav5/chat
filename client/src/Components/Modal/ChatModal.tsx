import React, {useState} from 'react';
import {ChatType} from "../../types/ChatType";
import ContactItem from "../ContactItem";
import {baseURL} from "../../apis";
import {leave} from "../../apis/chatApi";
import {CHATS_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import {useStore} from "../../store";

interface props {
    chat: ChatType,
    onHide: (bool: boolean) => void
}

const ChatModal = ({chat, onHide}: props) => {
    const history = useNavigate()
    const [active, setActive] = useState<boolean>(false)
    const {chatStore} = useStore()
    const leaveHandler = () => {
        chatStore.removeChat(chat._id)
        leave(chat._id)
            .then((res) => {
                alert(res)
                history(CHATS_ROUTE + "/" + chat._id)
            })
    }
    return (
        <div className={"chatModal_wrap"}>
            <div className={"header"}>
                <img src={baseURL + chat.avatar}/>
                <div>
                    <h2>{chat.name}</h2>
                    <text>количество участников {chat.users.length}</text>
                </div>
            </div>
            <div
                onClick={() => {
                    setActive(!active)
                }}
                className={"menu"}
            >
                <h4>учасники</h4>
            </div>
            <div className={"Contact_wrap"} style={{display: active ? "block" : "none"}}>
                {chat.users.map((user) => <ContactItem hide={onHide} user={user}/>)}
            </div>
            <button onClick={leaveHandler}>Покинуть</button>
        </div>
    );
};

export default ChatModal;