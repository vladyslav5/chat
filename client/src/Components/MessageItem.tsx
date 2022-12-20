import React from 'react';
import {MessageType} from "../types/MessageType";
import {useStore} from "../store";
import {baseURL} from "../apis";

interface props {
    message: MessageType,
}

const MessageItem = ({message}: props) => {
    const {userStore} = useStore()
    const messageHandler = () => {
        message.user && userStore.setChosenUser(message.user)
    }
    const avatar: string = "http://images.assetsdelivery.com/compings_v2/passatic/passatic1905/passatic190500501.jpg"
    return (
        <div
            onClick={messageHandler}
            style={{display: "flex", justifyContent: message.user ? "start" : "center"}}
            className={"message"}
        >
            <div>
                {message.user &&
                    <img className={" message avatar"} alt={"avatar"} src={!!message.user.avatar ? (baseURL + message.user.avatar) : avatar}/>}
            </div>
            <div className={"message_content"}>
                <div style={{display: "flex"}}>
                    <h4 style={{marginRight: "10px"}}>
                        {message.user && message.user.login}
                    </h4>
                    <div style={{fontSize: 11}}>{message.createdAt}</div>
                </div>
                <div>
                    {message.text}
                    {message.audio && <audio controls>
                        <source src={baseURL + message.audio}/>
                    </audio>}
                    {message?.files?.map(file => <div>
                        {/*<img src={baseURL + file}/>*/}
                        <img className={"message files"} style={{maxHeight:"200px",maxWidth:"500px"}} src={baseURL+file}/>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default MessageItem;