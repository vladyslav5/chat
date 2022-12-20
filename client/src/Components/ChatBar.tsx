import React, {FC, useState} from 'react';
import {ChatType} from "../types/ChatType";
import Modal from "./Modal/Modal";
import ChatModal from "./Modal/ChatModal";

interface Props {
    chat: ChatType
}

const ChatBar: FC<Props> = ({chat}) => {
    const [active, setActive] = useState<boolean>(false)

    const onHide = (bool: boolean) => {
        setActive(bool)
    }
    return (
        <div className={"ChatBar"} onClick={() => setActive(!active)}>
            <h1>
                {chat?.name}
            </h1>
            <Modal active={active} onHide={onHide}>
                <ChatModal onHide={onHide} chat={chat}/>
            </Modal>
        </div>
    );
};

export default ChatBar;