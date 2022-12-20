import React, {ReactNode, useEffect, useState} from 'react';
import {useStore} from "../../store";
import {baseURL} from "../../apis";
import {ChatType} from "../../types/ChatType";
import {getAll, privetMessage} from "../../apis/chatApi";
import {ChatItem} from "../ChatItem";
import {CHATS_ROUTE, MY_CHATS_ROUTE} from "../../utils/consts";
import {addContact} from "../../apis/userApi";
import {useNavigate} from "react-router-dom";

interface props {
    active: boolean,
    onHide: (bool: boolean) => void

}

const UserModal = ({active, onHide}: props) => {
    const {userStore} = useStore()
    const {chosenUser} = userStore
    const [userChats, setUserChats] = useState<ChatType[] | null>(null)
    useEffect(() => {
        getAll({users: chosenUser?._id})
            .then((res) => {
                setUserChats(res)
            })
    }, [active])
    const [userChatsActive, setUserChatsActive] = useState<boolean>(false)
    const addHandler = () => {
        chosenUser?._id && addContact(chosenUser._id)
            .then((res) => {
                alert(res)
            })
    }
    return (
        <div className={"Profile"}>
            <h2>{chosenUser?.login}</h2>
            <img alt={"avatar"} src={baseURL + chosenUser?.avatar}/>
            <div
                onClick={() => setUserChatsActive(!userChatsActive)}
                className={"userChatsClick"}
            >
                <h4>В чатах:</h4>
            </div>
            <div
                onClick={() => onHide(false)}
                style={{display: userChatsActive ? "block" : "none"}}
                className={"userChats"}
            >
                {userChats?.map(chat => <ChatItem chat={chat} route={CHATS_ROUTE}/>)}
            </div>
            {chosenUser?._id != userStore?.currentUser?._id
                &&
                <div>
                    <button onClick={addHandler}>Добавить в контакты</button>
                </div>
            }
        </div>
    );
};

export default UserModal;